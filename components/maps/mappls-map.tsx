"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Map } from "lucide-react"

interface MapplsMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{
    position: { lat: number; lng: number }
    title?: string
    info?: string
    icon?: string
  }>
  height?: string
  width?: string
}

export function MapplsMap({
  center = { lat: 28.6139, lng: 77.209 }, // Default to New Delhi, India
  zoom = 12,
  markers = [],
  height = "400px",
  width = "100%",
}: MapplsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [apiKey, setApiKey] = useState<string | null>(null)

  // Fetch the API key from our secure endpoint
  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch("/api/maps/mappls-config")
        if (!response.ok) {
          throw new Error("Failed to fetch Mappls API key")
        }
        const data = await response.json()
        setApiKey(data.apiKey)
      } catch (err) {
        console.error("Error fetching Mappls API key:", err)
        setError("Failed to load Mappls API key")
        setLoading(false)
      }
    }

    fetchApiKey()
  }, [])

  useEffect(() => {
    if (!apiKey) {
      return // Wait until we have the API key
    }

    // Load Mappls SDK
    const loadMapplsSDK = () => {
      if (window.mapplsgl) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = "https://apis.mappls.com/advancedmaps/api/" + apiKey + "/map_sdk?v=3.0&layer=vector"
      script.async = true
      script.onload = initializeMap
      script.onerror = () => {
        setError("Failed to load Mappls SDK")
        setLoading(false)
      }
      document.body.appendChild(script)
    }

    // Initialize map after SDK is loaded
    const initializeMap = () => {
      try {
        if (!mapRef.current || !window.mapplsgl) {
          throw new Error("Map container or Mappls SDK not available")
        }

        // Initialize map
        const map = new window.mapplsgl.Map({
          container: mapRef.current,
          center: [center.lng, center.lat],
          zoom: zoom,
          style: "https://apis.mappls.com/advancedmaps/api/" + apiKey + "/map_sdk/styles/vector/mappls.day",
        })

        map.on("load", () => {
          // Add markers
          markers.forEach((marker) => {
            const el = document.createElement("div")
            el.className = "mappls-marker"
            el.style.width = "30px"
            el.style.height = "30px"
            el.style.backgroundImage = marker.icon
              ? `url(${marker.icon})`
              : "url('https://apis.mappls.com/map_v3/1.png')"
            el.style.backgroundSize = "cover"

            // Create popup if info is provided
            if (marker.info) {
              const popup = new window.mapplsgl.Popup({ offset: 25 }).setHTML(
                `<div>
                 <h3 style="font-weight: bold; font-size: 14px;">${marker.title || "Land Parcel"}</h3>
                 <p style="font-size: 12px; margin-top: 5px;">${marker.info}</p>
               </div>`,
              )

              // Add marker to map
              new window.mapplsgl.Marker(el)
                .setLngLat([marker.position.lng, marker.position.lat])
                .setPopup(popup)
                .addTo(map)
            } else {
              // Add marker without popup
              new window.mapplsgl.Marker(el).setLngLat([marker.position.lng, marker.position.lat]).addTo(map)
            }
          })

          setMapInstance(map)
          setLoading(false)
        })

        map.on("error", (e: any) => {
          console.error("Mappls map error:", e)
          setError("Error initializing map")
          setLoading(false)
        })
      } catch (err) {
        console.error("Error initializing Mappls map:", err)
        setError("Failed to initialize map")
        setLoading(false)
      }
    }

    // Add Mappls CSS
    const addMapplsCSS = () => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://apis.mappls.com/advancedmaps/api/" + apiKey + "/map_sdk?v=3.0&layer=vector&css=true"
      document.head.appendChild(link)
    }

    addMapplsCSS()
    loadMapplsSDK()

    // Cleanup
    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [apiKey, center, markers, zoom])

  // Update map center and zoom if props change and map is initialized
  useEffect(() => {
    if (mapInstance) {
      mapInstance.setCenter([center.lng, center.lat])
      mapInstance.setZoom(zoom)
    }
  }, [center, zoom, mapInstance])

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center" style={{ height, width }}>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Error: {error}</p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Please check your Mappls API key or try again later.
          </p>
          <div
            className="mt-4 bg-muted/50 rounded-lg flex items-center justify-center"
            style={{ height: "80%", width: "100%" }}
          >
            <Map className="h-12 w-12 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div style={{ height, width, position: "relative" }}>
      {loading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} className="rounded-lg shadow-md" />
    </div>
  )
}

// Add TypeScript interface for the window object to include mapplsgl
declare global {
  interface Window {
    mapplsgl: any
  }
}
