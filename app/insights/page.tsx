"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GoogleMap } from "@/components/maps/google-map"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { AlertCircle, FileDown, Map } from "lucide-react"

export default function InsightsPage() {
  const [selectedState, setSelectedState] = useState<string>("all")
  const [mapError, setMapError] = useState<string | null>(null)

  // Sample data for charts
  const pieChartData = [
    { name: "Uttar Pradesh", value: 35 },
    { name: "Maharashtra", value: 25 },
    { name: "Karnataka", value: 20 },
    { name: "Tamil Nadu", value: 15 },
    { name: "Madhya Pradesh", value: 5 },
  ]

  const barChartData = [
    { name: "Lucknow", disputes: 45 },
    { name: "Mumbai", disputes: 38 },
    { name: "Bangalore", disputes: 32 },
    { name: "Chennai", disputes: 28 },
    { name: "Bhopal", disputes: 22 },
  ]

  const lineChartData = [
    { month: "Jan", price: 1200 },
    { month: "Feb", price: 1250 },
    { month: "Mar", price: 1300 },
    { month: "Apr", price: 1280 },
    { month: "May", price: 1350 },
    { month: "Jun", price: 1400 },
    { month: "Jul", price: 1450 },
    { month: "Aug", price: 1500 },
    { month: "Sep", price: 1550 },
    { month: "Oct", price: 1600 },
    { month: "Nov", price: 1650 },
    { month: "Dec", price: 1700 },
  ]

  // Sample markers for the map
  const markers = [
    {
      position: { lat: 28.6139, lng: 77.209 }, // Delhi
      title: "Delhi",
      info: "Records: 12,345<br>Verified: 85%",
    },
    {
      position: { lat: 19.076, lng: 72.8777 }, // Mumbai
      title: "Mumbai",
      info: "Records: 10,567<br>Verified: 78%",
    },
    {
      position: { lat: 12.9716, lng: 77.5946 }, // Bangalore
      title: "Bangalore",
      info: "Records: 8,932<br>Verified: 82%",
    },
    {
      position: { lat: 13.0827, lng: 80.2707 }, // Chennai
      title: "Chennai",
      info: "Records: 7,654<br>Verified: 75%",
    },
    {
      position: { lat: 23.2599, lng: 77.4126 }, // Bhopal
      title: "Bhopal",
      info: "Records: 5,432<br>Verified: 70%",
    },
  ]

  // Fallback map component when Google Maps fails to load
  const MapFallback = () => (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center h-[500px]">
        <div className="flex items-center gap-2 text-amber-500 mb-2">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">Map temporarily unavailable</p>
        </div>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          We're unable to load the map at this time. Please check your internet connection or try again later.
        </p>
        <div className="mt-8 bg-muted/30 rounded-lg flex items-center justify-center w-full h-64">
          <Map className="h-16 w-16 text-muted-foreground/50" />
        </div>
        <Button variant="outline" className="mt-8" onClick={() => window.location.reload()}>
          Retry Loading Map
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2">Land Record Insights</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore data-driven insights about land records across India.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Records</CardTitle>
            <CardDescription>As of April 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">124,567</div>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500">↑ 12.5%</span> increase from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Verified Records</CardTitle>
            <CardDescription>Blockchain-secured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">98,432</div>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500">79%</span> of total records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Monthly active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">45,678</div>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500">↑ 8.3%</span> increase from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts">
        <TabsList className="mb-6">
          <TabsTrigger value="charts">Charts & Graphs</TabsTrigger>
          <TabsTrigger value="map">Geographic Data</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Record Uploads by State</CardTitle>
                <CardDescription>Distribution of land record uploads across states</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={pieChartData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Districts by Ownership Disputes</CardTitle>
                <CardDescription>Districts with the highest number of land ownership disputes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={barChartData} />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Average Land Price Trend (2025)</CardTitle>
                <CardDescription>Monthly average land price per square meter in urban areas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={lineChartData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>India Land Records Map</CardTitle>
              <CardDescription>Geographic distribution of land records across India</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Filter by State:</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full md:w-64 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="all">All States</option>
                  <option value="up">Uttar Pradesh</option>
                  <option value="mh">Maharashtra</option>
                  <option value="ka">Karnataka</option>
                  <option value="tn">Tamil Nadu</option>
                  <option value="mp">Madhya Pradesh</option>
                </select>
              </div>

              <div className="h-[500px] rounded-lg overflow-hidden">
                {/* Use a try-catch approach with fallback UI */}
                <GoogleMap
                  height="500px"
                  markers={markers}
                  useCustomStyle={true}
                  center={{ lat: 22.5937, lng: 78.9629 }} // Center of India
                  zoom={5}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">High Verification Rate ({">"}80%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Medium Verification Rate (50-80%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Low Verification Rate ({"<"}50%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Downloadable Resources</CardTitle>
                <CardDescription>Educational materials and guides for land record management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">How to Verify Your Land Record</h4>
                      <p className="text-sm text-muted-foreground">
                        A step-by-step guide to verifying land records on TerraChain
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileDown className="h-4 w-4 mr-2" /> PDF
                    </Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Mutation vs Registry vs Partition</h4>
                      <p className="text-sm text-muted-foreground">Understanding different land record processes</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileDown className="h-4 w-4 mr-2" /> PDF
                    </Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Land Record Glossary</h4>
                      <p className="text-sm text-muted-foreground">
                        Common terms and definitions in land record management
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileDown className="h-4 w-4 mr-2" /> PDF
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback & Support</CardTitle>
                <CardDescription>Help us improve TerraChain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Report a Bug</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Found an issue with the platform? Let us know so we can fix it.
                    </p>
                    <Button>Report a Bug</Button>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Feature Request</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Have an idea for a new feature? We'd love to hear it.
                    </p>
                    <Button variant="outline">Submit Request</Button>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Contact Support</h4>
                    <p className="text-sm text-muted-foreground mb-3">Need help? Our support team is available 24/7.</p>
                    <Button variant="secondary">Contact Support</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
