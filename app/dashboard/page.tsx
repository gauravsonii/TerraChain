"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DashboardSkeleton, ChartSkeleton } from "@/components/ui/skeleton"
import { StatsCard } from "@/components/dashboard/stats-card"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { getLandRecords } from "@/lib/supabase-client"
import { FileText, Users, Map, ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRecords: 0,
    verifiedRecords: 0,
    pendingRecords: 0,
    disputedRecords: 0,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const result = await getLandRecords()

        if (result.success) {
          const records = result.records || []
          const verified = records.filter((r) => r.status === "verified").length
          const pending = records.filter((r) => r.status === "pending").length
          const disputed = records.filter((r) => r.status === "disputed").length

          setStats({
            totalRecords: records.length,
            verifiedRecords: verified,
            pendingRecords: pending,
            disputedRecords: disputed,
          })
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        // Simulate loading for demo purposes
        setTimeout(() => setIsLoading(false), 1500)
      }
    }

    fetchData()
  }, [])

  // Sample data for charts
  const pieChartData = [
    { name: "Verified", value: stats.verifiedRecords },
    { name: "Pending", value: stats.pendingRecords },
    { name: "Disputed", value: stats.disputedRecords },
  ]

  const barChartData = [
    { name: "Jan", records: 45 },
    { name: "Feb", records: 52 },
    { name: "Mar", records: 49 },
    { name: "Apr", records: 62 },
    { name: "May", records: 58 },
    { name: "Jun", records: 65 },
  ]

  const lineChartData = [
    { date: "2024-11", users: 1200 },
    { date: "2024-12", users: 1350 },
    { date: "2025-01", users: 1500 },
    { date: "2025-02", users: 1750 },
    { date: "2025-03", users: 2100 },
    { date: "2025-04", users: 2450 },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Download Report
          </Button>
        </div>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Records"
            value={stats.totalRecords.toString()}
            description="+20.1% from last month"
            icon={<FileText className="h-5 w-5" />}
          />
          <StatsCard
            title="Verified Records"
            value={stats.verifiedRecords.toString()}
            description="+15.2% from last month"
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            title="Pending Records"
            value={stats.pendingRecords.toString()}
            description="+5.4% from last month"
            icon={<Map className="h-5 w-5" />}
          />
          <StatsCard
            title="Disputed Records"
            value={stats.disputedRecords.toString()}
            description="+2.1% from last month"
            icon={<ArrowUpRight className="h-5 w-5" />}
          />
        </div>
      )}

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Record Uploads</CardTitle>
                <CardDescription>Monthly record uploads for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <ChartSkeleton />
                  </div>
                ) : (
                  <BarChart data={barChartData} />
                )}
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Record Status</CardTitle>
                <CardDescription>Distribution of record verification status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <ChartSkeleton />
                  </div>
                ) : (
                  <PieChart data={pieChartData} />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-muted rounded animate-pulse" />
                    <div className="h-5 bg-muted rounded animate-pulse w-[90%]" />
                    <div className="h-5 bg-muted rounded animate-pulse w-[80%]" />
                    <div className="h-5 bg-muted rounded animate-pulse w-[85%]" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New record added</p>
                        <p className="text-xs text-muted-foreground">Survey No. 123/A, Bhopal</p>
                      </div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Record verified</p>
                        <p className="text-xs text-muted-foreground">Survey No. 456/B, Mumbai</p>
                      </div>
                      <div className="text-xs text-muted-foreground">5 hours ago</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Ownership transferred</p>
                        <p className="text-xs text-muted-foreground">Survey No. 789/C, Bangalore</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Yesterday</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly active users</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <ChartSkeleton />
                  </div>
                ) : (
                  <LineChart data={lineChartData} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analysis of land record data</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Advanced analytics content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Download and view generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reports content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
