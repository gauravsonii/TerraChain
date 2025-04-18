import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Calendar, User, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

// Sample data for records
const landRecords = [
  {
    id: "REC-001",
    owner: "John Smith",
    area: "5.2 acres",
    location: "North District, Plot 123",
    status: "verified",
    lastUpdated: "2023-04-15",
    crop: "Wheat",
    documentHash: "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
  },
  {
    id: "REC-002",
    owner: "Sarah Johnson",
    area: "3.7 acres",
    location: "East District, Plot 45A",
    status: "pending",
    lastUpdated: "2023-04-10",
    crop: "Corn",
    documentHash: "QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX",
  },
  {
    id: "REC-003",
    owner: "Michael Brown",
    area: "8.1 acres",
    location: "West District, Plot 78B",
    status: "verified",
    lastUpdated: "2023-04-05",
    crop: "Soybeans",
    documentHash: "QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V",
  },
  {
    id: "REC-004",
    owner: "Emily Davis",
    area: "2.5 acres",
    location: "South District, Plot 32C",
    status: "disputed",
    lastUpdated: "2023-04-01",
    crop: "Rice",
    documentHash: "QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y",
  },
  {
    id: "REC-005",
    owner: "Robert Wilson",
    area: "6.3 acres",
    location: "Central District, Plot 56D",
    status: "verified",
    lastUpdated: "2023-03-28",
    crop: "Cotton",
    documentHash: "QmY5heUM5qgRubMDhVzLCwGLFanmLT6AMpYz8qBZ8X3vm4",
  },
  {
    id: "REC-006",
    owner: "Jennifer Lee",
    area: "4.8 acres",
    location: "North District, Plot 89F",
    status: "verified",
    lastUpdated: "2023-03-20",
    crop: "Barley",
    documentHash: "QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n",
  },
]

export default function RecordsPage() {
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
        <section className="w-full py-12 md:py-24 bg-neutral">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Land Records</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Browse and search through all land records stored on the blockchain
              </p>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input placeholder="Search by owner, location, or record ID..." className="pl-9 w-full" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Public Records</h2>
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {landRecords.map((record) => (
                    <Card key={record.id} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{record.id}</CardTitle>
                            <CardDescription className="mt-1">{record.owner}</CardDescription>
                          </div>
                          {getStatusBadge(record.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <span>{record.location}</span>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <span>Last updated: {record.lastUpdated}</span>
                          </div>
                          <div className="flex items-start">
                            <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <span>Area: {record.area}</span>
                          </div>
                          <div className="flex items-start">
                            <User className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <span>Crop: {record.crop}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t">
                        <Link href={`/records/${record.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-primary">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          IPFS Document
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="w-full">
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">Owner</th>
                        <th className="p-3 text-left font-medium">Location</th>
                        <th className="p-3 text-left font-medium">Area</th>
                        <th className="p-3 text-left font-medium">Crop</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Last Updated</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {landRecords.map((record, index) => (
                        <tr key={record.id} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                          <td className="p-3">{record.id}</td>
                          <td className="p-3">{record.owner}</td>
                          <td className="p-3">{record.location}</td>
                          <td className="p-3">{record.area}</td>
                          <td className="p-3">{record.crop}</td>
                          <td className="p-3">{getStatusBadge(record.status)}</td>
                          <td className="p-3">{record.lastUpdated}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Link href={`/records/${record.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing 6 of 24 records</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-neutral">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="space-y-4 max-w-md">
                <h2 className="text-2xl font-bold">Need to register a new land record?</h2>
                <p className="text-gray-500">
                  Add your land details to the blockchain for secure, transparent, and immutable record-keeping.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/add-record">
                  <Button className="bg-primary hover:bg-primary/90">Add New Record</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
