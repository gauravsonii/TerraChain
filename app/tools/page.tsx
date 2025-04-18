"use client"

import { useState } from "react"
import {
  FileCheck,
  MapPin,
  Scale,
  Code,
  Scan,
  ArrowRight,
  Search,
  AlertTriangle,
  Loader2,
  FileText,
  BookOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockTools, mockCaseLaw } from "@/lib/mock-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [caseLawQuery, setCaseLawQuery] = useState("")
  const [caseLawResults, setCaseLawResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const filteredTools = mockTools.filter((tool) => {
    if (activeTab !== "all" && activeTab !== tool.id) return false
    if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleCaseLawSearch = () => {
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const results = mockCaseLaw.filter(
        (caseLaw) =>
          caseLaw.title.toLowerCase().includes(caseLawQuery.toLowerCase()) ||
          caseLaw.summary.toLowerCase().includes(caseLawQuery.toLowerCase()),
      )
      setCaseLawResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case "FileCheck":
        return <FileCheck className="h-6 w-6" />
      case "MapPin":
        return <MapPin className="h-6 w-6" />
      case "Scale":
        return <Scale className="h-6 w-6" />
      case "Code":
        return <Code className="h-6 w-6" />
      case "Scan":
        return <Scan className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  const renderToolContent = () => {
    switch (selectedTool) {
      case "document-validator":
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                <FileCheck className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Upload Document for Validation</h3>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop your document here, or click to browse</p>
              <Input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="max-w-sm" />
              <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document-type">Document Type</Label>
                <Select>
                  <SelectTrigger id="document-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale-deed">Sale Deed</SelectItem>
                    <SelectItem value="title-deed">Title Deed</SelectItem>
                    <SelectItem value="property-tax">Property Tax Receipt</SelectItem>
                    <SelectItem value="encumbrance">Encumbrance Certificate</SelectItem>
                    <SelectItem value="noc">No Objection Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp">Madhya Pradesh</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="ka">Karnataka</SelectItem>
                    <SelectItem value="tn">Tamil Nadu</SelectItem>
                    <SelectItem value="ap">Andhra Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">Validate Document</Button>
          </div>
        )
      case "land-locator":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="survey-number">Survey Number</Label>
              <Input id="survey-number" placeholder="Enter survey number (e.g., 123/A)" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp">Madhya Pradesh</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="ka">Karnataka</SelectItem>
                    <SelectItem value="tn">Tamil Nadu</SelectItem>
                    <SelectItem value="ap">Andhra Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Select>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North District</SelectItem>
                    <SelectItem value="south">South District</SelectItem>
                    <SelectItem value="east">East District</SelectItem>
                    <SelectItem value="west">West District</SelectItem>
                    <SelectItem value="central">Central District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="rounded-lg border h-[300px] flex items-center justify-center bg-muted">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Map will be displayed here</p>
              </div>
            </div>
            <Button className="w-full">Locate on Map</Button>
          </div>
        )
      case "case-law-finder":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="case-law-search">Search Case Law</Label>
              <div className="flex gap-2">
                <Input
                  id="case-law-search"
                  placeholder="Search by case name, keywords, or citation..."
                  value={caseLawQuery}
                  onChange={(e) => setCaseLawQuery(e.target.value)}
                />
                <Button onClick={handleCaseLawSearch} disabled={isSearching}>
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Search
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : caseLawResults.length > 0 ? (
                caseLawResults.map((caseLaw) => (
                  <Card key={caseLaw.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{caseLaw.title}</CardTitle>
                        <Badge variant="outline">{caseLaw.relevance}</Badge>
                      </div>
                      <CardDescription>{caseLaw.citation}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{caseLaw.summary}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Full Case
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : caseLawQuery ? (
                <div className="text-center py-12 border rounded-lg">
                  <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                  <p className="text-muted-foreground">
                    No case law matches your search criteria. Try different keywords.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Search for Case Law</h3>
                  <p className="text-muted-foreground">Enter keywords to search for relevant land dispute cases.</p>
                </div>
              )}
            </div>
          </div>
        )
      case "developer-playground":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Select defaultValue="getLandRecords">
                <SelectTrigger id="api-endpoint">
                  <SelectValue placeholder="Select API endpoint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="getLandRecords">GET /api/land-records</SelectItem>
                  <SelectItem value="getLandRecordById">GET /api/land-records/:id</SelectItem>
                  <SelectItem value="createLandRecord">POST /api/land-records</SelectItem>
                  <SelectItem value="updateLandRecord">PUT /api/land-records/:id</SelectItem>
                  <SelectItem value="deleteLandRecord">DELETE /api/land-records/:id</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-body">Request Body (JSON)</Label>
              <Textarea
                id="request-body"
                className="font-mono h-32"
                placeholder='{\n  "ownerName": "John Doe",\n  "landArea": "5.2",\n  "location": "North District, Plot 123"\n}'
              />
            </div>
            <Button className="w-full">Send Request</Button>
            <div className="space-y-2">
              <Label htmlFor="response">Response</Label>
              <div className="rounded-md border bg-muted p-4 font-mono text-sm h-48 overflow-auto">
                <pre>{JSON.stringify({ success: true, message: "API response will appear here" }, null, 2)}</pre>
              </div>
            </div>
          </div>
        )
      case "kyc-sandbox":
        return (
          <div className="space-y-6">
            <div className="text-center py-12 border rounded-lg">
              <Scan className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">KYC Sandbox Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                This feature is currently in development and will be available soon.
              </p>
              <Badge variant="outline">Coming in Q3 2024</Badge>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tools & Mini-Apps</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Specialized utilities for land management and verification
            </p>
          </div>

          {selectedTool ? (
            <div className="space-y-6">
              <Button variant="outline" onClick={() => setSelectedTool(null)}>
                Back to Tools
              </Button>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      {getToolIcon(mockTools.find((tool) => tool.id === selectedTool)?.icon || "FileText")}
                    </div>
                    <div>
                      <CardTitle>{mockTools.find((tool) => tool.id === selectedTool)?.name}</CardTitle>
                      <CardDescription>
                        {mockTools.find((tool) => tool.id === selectedTool)?.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>{renderToolContent()}</CardContent>
              </Card>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All Tools</TabsTrigger>
                    <TabsTrigger value="document-validator">Document</TabsTrigger>
                    <TabsTrigger value="land-locator">Location</TabsTrigger>
                    <TabsTrigger value="case-law-finder">Legal</TabsTrigger>
                    <TabsTrigger value="developer-playground">Developer</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tools..."
                    className="pl-9 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card
                    key={tool.id}
                    className={`overflow-hidden transition-all hover:shadow-md ${!tool.available ? "opacity-70" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full p-2 bg-primary/10 text-primary">{getToolIcon(tool.icon)}</div>
                        <div>
                          <CardTitle>{tool.name}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {!tool.available && (
                        <Badge variant="outline" className="mb-4">
                          Coming Soon
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {tool.available
                          ? "This tool is ready to use. Click below to get started."
                          : "This tool is currently in development and will be available soon."}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={tool.available ? "default" : "outline"}
                        className="w-full"
                        disabled={!tool.available}
                        onClick={() => tool.available && setSelectedTool(tool.id)}
                      >
                        {tool.available ? (
                          <>
                            Launch Tool
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          "Coming Soon"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
