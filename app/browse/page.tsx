"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, FileText, Loader2, MapPin, Calendar, ArrowRight, BarChart2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/lib/mock-api"
import { districts } from "@/lib/mock-data"
import { formatDate, getStatusColor } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BrowsePage() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    district: "",
  })
  const [view, setView] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetchRecords()
  }, [filters])

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const result = await api.getLandRecords(filters)
      if (result.success) {
        setRecords(result.records)
      }
    } catch (error) {
      console.error("Error fetching records:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
  }

  const handleDistrictChange = (value: string) => {
    setFilters((prev) => ({ ...prev, district: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
      district: "",
    })
  }

  const getStatusBadge = (status: string) => {
    return <Badge className={getStatusColor(status)}>{status}</Badge>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Land Records</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Browse and search through all land records stored on the blockchain
              </p>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by owner, location, or record ID..."
                  className="pl-9 w-full"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filters.status} onValueChange={handleStatusChange}>
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
                <Select value={filters.district} onValueChange={handleDistrictChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleClearFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue={view} onValueChange={(value) => setView(value as "grid" | "list")} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Public Records</h2>
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>

              {loading ? (
                <div className="w-full flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading land records...</p>
                </div>
              ) : records.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Records Found</h3>
                  <p className="text-muted-foreground mb-6">No land records match your search criteria.</p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <TabsContent value="grid" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {records.map((record) => (
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
                                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                <span>{record.location}</span>
                              </div>
                              <div className="flex items-start">
                                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                <span>Last updated: {formatDate(record.lastUpdated)}</span>
                              </div>
                              <div className="flex items-start">
                                <BarChart2 className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                <span>Area: {record.area}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Link href={`/records/${record.id}`} className="w-full">
                              <Button variant="outline" className="w-full">
                                View Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="list" className="w-full">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Record ID</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Area</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {records.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell className="font-medium">{record.id}</TableCell>
                              <TableCell>{record.owner}</TableCell>
                              <TableCell>{record.location}</TableCell>
                              <TableCell>{record.area}</TableCell>
                              <TableCell>{formatDate(record.lastUpdated)}</TableCell>
                              <TableCell>{getStatusBadge(record.status)}</TableCell>
                              <TableCell className="text-right">
                                <Link href={`/records/${record.id}`}>
                                  <Button variant="ghost" size="sm">
                                    View
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
