"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Map } from "lucide-react"

interface GoogleMapProps {
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
  apiKey?: string
  useCustomStyle?: boolean
}

// TerraChain custom map style - earthy tones with modern look
const terraChainMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#8a6d3b",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a6d3b",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#e8f5e9",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#c8e6c9",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#a5d6a7",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#e0e0e0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#b3e5fc",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
]

export function GoogleMap({
  center = { lat: 23.2599, lng: 77.4126 }, // Default to Bhopal, India
  zoom = 12,
  markers = [],
  height = "400px",
  width = "100%",
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  useCustomStyle = true,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is missing")
      setLoading(false)
      return
    }

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
        })

        const google = await loader.load()

        if (!google || !google.maps) {
          throw new Error("Google Maps API failed to load")
        }

        if (mapRef.current && !mapInstance) {
          const mapOptions: google.maps.MapOptions = {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
          }

          // Apply custom style if enabled
          if (useCustomStyle) {
            mapOptions.styles = terraChainMapStyle
          }

          const map = new google.maps.Map(mapRef.current, mapOptions)

          setMapInstance(map)

          // Add markers if provided
          markers.forEach((marker) => {
            const markerOptions: google.maps.MarkerOptions = {
              position: marker.position,
              map,
              title: marker.title,
            }

            // Use custom icon for markers if no specific icon is provided
            if (!marker.icon) {
              markerOptions.icon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#4CAF50",
                fillOpacity: 0.9,
                strokeWeight: 1,
                strokeColor: "#388E3C",
                scale: 8,
              }
            } else {
              markerOptions.icon = marker.icon
            }

            const mapMarker = new google.maps.Marker(markerOptions)

            // Add info window if info is provided
            if (marker.info) {
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div class="p-2">
                    <h3 class="font-bold text-sm">${marker.title || "Land Parcel"}</h3>
                    <p class="text-xs mt-1">${marker.info}</p>
                  </div>
                `,
              })

              mapMarker.addListener("click", () => {
                infoWindow.open(map, mapMarker)
              })
            }
          })
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err)
        setError("Failed to load Google Maps")
      } finally {
        setLoading(false)
      }
    }

    initMap()
  }, [apiKey, center, markers, zoom, mapInstance, useCustomStyle])

  // Update map center and zoom if props change
  useEffect(() => {
    if (mapInstance) {
      mapInstance.setCenter(center)
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
            Please check your Google Maps API key or try again later.
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
