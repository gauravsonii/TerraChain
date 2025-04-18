"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IPFSDocumentUpload } from "@/components/blockchain/ipfs-document-upload"
import { TransactionStatus } from "@/components/blockchain/transaction-status"
import { createLandRecord } from "@/services/blockchain-service"
import { WalletConnect } from "@/components/blockchain/wallet-connect"

const formSchema = z.object({
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  landArea: z.string().min(1, {
    message: "Land area is required.",
  }),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  district: z.string({
    required_error: "Please select a district.",
  }),
  acquisitionDate: z.date({
    required_error: "Acquisition date is required.",
  }),
  cropHistory: z.string().optional(),
  additionalNotes: z.string().optional(),
})

export function LandRecordForm() {
  const [documentHash, setDocumentHash] = useState<string>("")
  const [transactionState, setTransactionState] = useState<{
    status: "idle" | "pending" | "success" | "error"
    hash?: string
    error?: string
  }>({
    status: "idle",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      landArea: "",
      location: "",
      cropHistory: "",
      additionalNotes: "",
    },
  })

  const handleDocumentUpload = (hash: string) => {
    setDocumentHash(hash)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!documentHash) {
      toast({
        title: "Document required",
        description: "Please upload a land document to IPFS before submitting.",
        variant: "destructive",
      })
      return
    }

    setTransactionState({ status: "pending" })

    try {
      // Format crop history as JSON string
      const cropHistoryJson = JSON.stringify({
        crops: values.cropHistory?.split(",").map((crop) => crop.trim()) || [],
        lastUpdated: new Date().toISOString(),
      })

      // Submit to blockchain
      const result = await createLandRecord(
        `${values.location}, ${values.district}`,
        Number.parseFloat(values.landArea),
        cropHistoryJson,
        documentHash,
      )

      if (result.success) {
        setTransactionState({
          status: "success",
          hash: result.transactionHash,
        })

        toast({
          title: "Land record submitted",
          description: `Record #${result.recordId} has been successfully added to the blockchain.`,
        })

        form.reset()
        setDocumentHash("")
      } else {
        setTransactionState({
          status: "error",
          error: result.error,
        })

        toast({
          title: "Transaction failed",
          description: result.error || "Failed to submit record to blockchain",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting land record:", error)
      setTransactionState({
        status: "error",
        error: "An unexpected error occurred",
      })

      toast({
        title: "Transaction failed",
        description: "An unexpected error occurred while submitting the record",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Land Record to Blockchain</CardTitle>
        <CardDescription>
          Enter the details of the land record to be permanently stored on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <WalletConnect />
        </div>

        <TransactionStatus
          status={transactionState.status}
          transactionHash={transactionState.hash}
          errorMessage={transactionState.error}
          onDismiss={() => setTransactionState({ status: "idle" })}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormDescription>Full legal name of the land owner</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="landArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Land Area</FormLabel>
                    <FormControl>
                      <Input placeholder="5.2" {...field} />
                    </FormControl>
                    <FormDescription>Total area of the land in acres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="123 Farm Road, Plot 45A" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Physical address or plot number of the land</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="north">North District</SelectItem>
                        <SelectItem value="south">South District</SelectItem>
                        <SelectItem value="east">East District</SelectItem>
                        <SelectItem value="west">West District</SelectItem>
                        <SelectItem value="central">Central District</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Administrative district where the land is located</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acquisitionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Acquisition Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Date when the land was acquired</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cropHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop History</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Wheat, Corn, Rice" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Comma-separated list of crops grown on the land</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <IPFSDocumentUpload onUploadComplete={handleDocumentUpload} documentHash={documentHash} />

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information about the land..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Any other relevant information about the land</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset()
                  setDocumentHash("")
                }}
                disabled={transactionState.status === "pending"}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={transactionState.status === "pending" || !documentHash}
              >
                {transactionState.status === "pending" ? "Submitting..." : "Submit to Blockchain"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
