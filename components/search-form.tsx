"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type SearchParams = {
  query: string
  field: string
}

export function SearchForm() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    field: "owner",
  })
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      console.log("Searching for:", searchParams)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Land Records</h2>
        <p className="text-gray-500">Search for land records by owner name, area, location, or other criteria</p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Label htmlFor="search-query">Search Query</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search-query"
                type="text"
                placeholder="Enter search term..."
                className="pl-9"
                value={searchParams.query}
                onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="search-field">Search By</Label>
            <Select
              value={searchParams.field}
              onValueChange={(value) => setSearchParams({ ...searchParams, field: value })}
            >
              <SelectTrigger id="search-field" className="mt-1">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner Name</SelectItem>
                <SelectItem value="area">Land Area</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="crop">Crop History</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={isSearching || !searchParams.query.trim()}
          >
            {isSearching ? "Searching..." : "Search Records"}
          </Button>
        </div>
      </form>
    </div>
  )
}
