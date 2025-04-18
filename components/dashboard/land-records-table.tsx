"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, FileEdit, Trash2, Eye, ExternalLink, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getAllLandRecords } from "@/services/blockchain-service"
import { getIPFSUrl } from "@/services/ipfs-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Type for land record from blockchain
interface LandRecord {
  id: number
  owner: string
  location: string
  landArea: number
  cropHistory: string
  documentHash: string
  timestamp: string
}

export function LandRecordsTable() {
  const [pageSize, setPageSize] = useState("10")
  const [records, setRecords] = useState<LandRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true)
        const result = await getAllLandRecords()

        if (result.success && result.records) {
          setRecords(result.records)
        } else {
          setError("Failed to fetch records from blockchain")
        }
      } catch (err) {
        console.error("Error fetching records:", err)
        setError("An unexpected error occurred while fetching records")
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  const getStatusBadge = (timestamp: string) => {
    // For demo purposes, we'll determine status based on timestamp
    // In a real app, this would come from the blockchain
    const recordDate = new Date(timestamp)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff < 2) {
      return <Badge className="bg-green-500">Verified</Badge>
    } else if (daysDiff < 5) {
      return <Badge className="bg-yellow-500">Pending</Badge>
    } else {
      return <Badge className="bg-red-500">Disputed</Badge>
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(38)}`
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading land records from blockchain...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>{error}. Please check your wallet connection and try again.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Land Records</h2>
          <p className="text-muted-foreground">Manage and view all land records in the blockchain</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 rows per page</SelectItem>
              <SelectItem value="10">10 rows per page</SelectItem>
              <SelectItem value="20">20 rows per page</SelectItem>
              <SelectItem value="50">50 rows per page</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">Add Record</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Record ID</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Crop History</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">#{record.id}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="underline decoration-dotted">
                          {formatAddress(record.owner)}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-mono text-xs">{record.owner}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{record.landArea} acres</TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>{record.cropHistory}</TableCell>
                  <TableCell>
                    {record.documentHash ? (
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => window.open(getIPFSUrl(record.documentHash), "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.timestamp)}</TableCell>
                  <TableCell>{new Date(record.timestamp).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Edit Record</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Record</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No records found on the blockchain. Add your first land record.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
