"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, FileText, MapPin, User, ExternalLink, Clock, History } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

// Sample data for a single record
const record = {
  id: "REC-001",
  owner: "John Smith",
  area: "5.2 acres",
  location: "North District, Plot 123",
  status: "verified",
  lastUpdated: "2023-04-15",
  crop: "Wheat",
  documentHash: "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
  transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  acquisitionDate: "2020-06-10",
  additionalNotes:
    "This land has been in the Smith family for three generations. It has good irrigation facilities and is suitable for wheat and rice cultivation.",
  history: [
    {
      date: "2023-04-15",
      event: "Record verified by government authority",
      transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    {
      date: "2023-03-20",
      event: "Record updated with new crop information",
      transactionHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    },
    {
      date: "2022-11-05",
      event: "Record created and added to blockchain",
      transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
  ],
}

export default function RecordDetailPage({ params }: { params: { id: string } }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "disputed":
        return <Badge className="bg-red-500">Disputed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <Link href="/records">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Records
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-bold">Land Record {params.id}</h1>
              {getStatusBadge(record.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Record Details</CardTitle>
                  <CardDescription>
                    Comprehensive information about this land record stored on the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                        <p className="text-lg font-medium">{record.owner}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                          <p className="text-lg font-medium">{record.location}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Area</h3>
                        <div className="flex items-start">
                          <FileText className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                          <p className="text-lg font-medium">{record.area}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Current Crop</h3>
                        <div className="flex items-start">
                          <User className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                          <p className="text-lg font-medium">{record.crop}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Acquisition Date</h3>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                          <p className="text-lg font-medium">{record.acquisitionDate}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                          <p className="text-lg font-medium">{record.lastUpdated}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Document</h3>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary"
                          onClick={() => window.open(`https://ipfs.io/ipfs/${record.documentHash}`, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on IPFS
                        </Button>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Blockchain Transaction</h3>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary"
                          onClick={() =>
                            window.open(`https://goerli.etherscan.io/tx/${record.transactionHash}`, "_blank")
                          }
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on Etherscan
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Notes</h3>
                    <p className="text-gray-700">{record.additionalNotes}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Record History</CardTitle>
                  <CardDescription>Chronological history of changes to this land record</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {record.history.map((item, index) => (
                      <div key={index} className="relative pl-6 pb-4">
                        <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-200"></div>
                        <div className="absolute left-[-4px] top-1 h-3 w-3 rounded-full bg-primary"></div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">{item.date}</p>
                          <p className="font-medium">{item.event}</p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-xs text-primary"
                            onClick={() =>
                              window.open(`https://goerli.etherscan.io/tx/${item.transactionHash}`, "_blank")
                            }
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Transaction
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="map" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="ownership">Ownership History</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="p-4 border rounded-md mt-2">
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=400&width=800"
                    alt="Land Location Map"
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Map showing the location and boundaries of the land parcel.
                </p>
              </TabsContent>
              <TabsContent value="documents" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Land Deed</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="aspect-[3/4] bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=300&width=225"
                          alt="Land Deed Document"
                          className="rounded-md object-cover"
                        />
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(`https://ipfs.io/ipfs/${record.documentHash}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Survey Certificate</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="aspect-[3/4] bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=300&width=225"
                          alt="Survey Certificate"
                          className="rounded-md object-cover"
                        />
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(`https://ipfs.io/ipfs/${record.documentHash}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="ownership" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Current Owner: {record.owner}</p>
                      <p className="text-sm text-gray-500">Since {record.acquisitionDate}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <History className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Previous Owner: Maria Garcia</p>
                      <p className="text-sm text-gray-500">2010-06-15 to 2020-06-10</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <History className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Original Owner: Robert Johnson</p>
                      <p className="text-sm text-gray-500">1995-03-22 to 2010-06-15</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Link href="/records">
                <Button variant="outline">Back to All Records</Button>
              </Link>
              <div className="space-x-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify on Blockchain
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
