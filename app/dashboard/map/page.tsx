"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapplsMap } from "@/components/maps/mappls-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { getLandRecords } from "@/lib/supabase-client"

export default function MapViewPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [landRecords, setLandRecords] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [markers, setMarkers] = useState<any[]>([])

  // Sample district data
  const districts = [
    { value: "all", label: "All Districts" },
    { value: "north", label: "North District" },
    { value: "south", label: "South District" },
    { value: "east", label: "East District" },
    { value: "west", label: "West District" },
    { value: "central", label: "Central District" },
  ]

  // Sample coordinates for districts (in a real app, these would come from the database)
  const districtCoordinates: Record<string, [number, number]> = {
    north: [28.7041, 77.1025],
    south: [28.5355, 77.2401],
    east: [28.6129, 77.2295],
    west: [28.6517, 77.1025],
    central: [28.6139, 77.209],
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const filters: any = {}

        if (searchQuery) {
          filters.search = searchQuery
        }

        if (selectedDistrict !== "all") {
          filters.district = selectedDistrict
        }

        const result = await getLandRecords(filters)

        if (result.success) {
          setLandRecords(result.records || [])

          // Create markers from land records
          const newMarkers = result.records.map((record: any) => {
            // In a real app, you would use actual coordinates from the record
            // For this demo, we'll use the district coordinates or random coordinates
            const baseCoords =
              record.district && districtCoordinates[record.district.toLowerCase()]
                ? districtCoordinates[record.district.toLowerCase()]
                : [28.6139, 77.209]

            // Add a small random offset to prevent markers from stacking
            const coords: [number, number] = [
              baseCoords[0] + (Math.random() - 0.5) * 0.05,
              baseCoords[1] + (Math.random() - 0.5) * 0.05,
            ]

            return {
              position: coords,
              title: record.owner,
              popup: `
                <div>
                  <h3 style="font-weight: bold;">${record.owner}</h3>
                  <p>Location: ${record.location}</p>
                  <p>Area: ${record.area}</p>
                  <p>Status: ${record.status}</p>
                  <p>Survey Number: ${record.survey_number || "N/A"}</p>
                </div>
              `,
            }
          })

          setMarkers(newMarkers)
        }
      } catch (error) {
        console.error("Error fetching land records for map:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchQuery, selectedDistrict])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is already triggered by the useEffect when searchQuery changes
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Map View</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>Find land records on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Search by owner, location, or survey number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                </div>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? "Loading records..." : `Showing ${landRecords.length} land records on the map`}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <MapplsMap
            center={
              selectedDistrict !== "all" && districtCoordinates[selectedDistrict]
                ? districtCoordinates[selectedDistrict]
                : [28.6139, 77.209]
            }
            zoom={selectedDistrict !== "all" ? 12 : 5}
            markers={markers}
            height="600px"
            title="Land Records Map"
          />
        </div>
      </div>
    </div>
  )
}
