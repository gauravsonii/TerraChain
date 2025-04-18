"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileText, Check, AlertCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [documentType, setDocumentType] = useState("land_deed")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file type
      const validTypes = ["application/pdf", "image/jpeg", "image/png"]
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF, JPEG, or PNG file.",
        })
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        })
        return
      }

      setFile(selectedFile)
      setUploadStatus("idle")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("uploading")
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Complete the progress
      setProgress(100)
      setUploadStatus("success")

      toast({
        title: "Document uploaded successfully",
        description: "Your document has been uploaded and is being processed.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus("error")

      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
      })
    } finally {
      setUploading(false)
      clearInterval(interval)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setProgress(0)
    setUploadStatus("idle")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Land Record Document</CardTitle>
        <CardDescription>
          Upload your land record documents for verification and blockchain registration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="camera">Use Camera</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type</Label>
              <select
                id="document-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                disabled={uploading}
              >
                <option value="land_deed">Land Deed</option>
                <option value="property_tax">Property Tax Receipt</option>
                <option value="mutation_record">Mutation Record</option>
                <option value="survey_document">Survey Document</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading}
                  className="flex-1"
                />
                {file && uploadStatus === "idle" && (
                  <Button variant="outline" size="icon" onClick={resetUpload} disabled={uploading}>
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {uploadStatus === "uploading" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Upload Progress</Label>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="rounded-md bg-green-50 p-4 text-green-700 flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Document uploaded successfully!</span>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="rounded-md bg-red-50 p-4 text-red-700 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Failed to upload document. Please try again.</span>
              </div>
            )}
          </TabsContent>
          <TabsContent value="camera" className="space-y-4">
            <div className="rounded-md border border-dashed p-10 text-center">
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Camera Capture</h3>
                <p className="text-sm text-muted-foreground">
                  This feature will be available in the next update. Please use the upload option for now.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()} disabled={uploading}>
          Cancel
        </Button>
        <Button onClick={handleUpload} disabled={!file || uploading || uploadStatus === "success"}>
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
