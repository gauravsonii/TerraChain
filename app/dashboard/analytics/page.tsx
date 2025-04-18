import { TopBar } from "@/components/dashboard/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, PieChart, LineChart, TrendingUp, TrendingDown } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1 overflow-auto p-6 bg-neutral">
        <div className="w-full">
          <div className="flex items-center justify-between py-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
              <p className="text-muted-foreground">View insights and statistics about land records</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="year">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">245</div>
                  <div className="flex items-center text-green-500 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    12%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Land Area</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12,450 acres</div>
                  <div className="flex items-center text-green-500 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    8%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Verified Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">198</div>
                  <div className="flex items-center text-green-500 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    15%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">47</div>
                  <div className="flex items-center text-red-500 text-sm font-medium">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    3%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Land Records by District</CardTitle>
                <CardDescription>Distribution of land records across districts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] flex items-center justify-center">
                  <PieChart className="h-full w-full text-gray-300" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Records Added Over Time</CardTitle>
                <CardDescription>Monthly record additions over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] flex items-center justify-center">
                  <LineChart className="h-full w-full text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Distribution</CardTitle>
                <CardDescription>Types of crops grown on registered land</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[21/9] flex items-center justify-center">
                  <BarChart className="h-full w-full text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
