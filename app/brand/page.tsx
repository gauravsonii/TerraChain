import { StyleGuide } from "@/components/brand/style-guide"
import { PresentationDeck } from "@/components/brand/presentation-deck"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoogleMap } from "@/components/maps/google-map"

export default function BrandPage() {
  // Sample markers for the map
  const markers = [
    {
      position: { lat: 23.2599, lng: 77.4126 },
      title: "Land Parcel #1234",
      info: "Owner: Rahul Sharma<br>Area: 2.5 acres<br>Status: Verified",
    },
    {
      position: { lat: 23.2699, lng: 77.4226 },
      title: "Land Parcel #5678",
      info: "Owner: Priya Patel<br>Area: 1.8 acres<br>Status: Pending Verification",
    },
    {
      position: { lat: 23.2499, lng: 77.4026 },
      title: "Land Parcel #9012",
      info: "Owner: Amit Kumar<br>Area: 3.2 acres<br>Status: Verified",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2">TerraChain Brand Assets</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Comprehensive branding guidelines and assets for the TerraChain platform.
      </p>

      <Tabs defaultValue="style-guide">
        <TabsList className="mb-6">
          <TabsTrigger value="style-guide">Style Guide</TabsTrigger>
          <TabsTrigger value="presentation">Presentation Deck</TabsTrigger>
          <TabsTrigger value="map-style">Map Style</TabsTrigger>
        </TabsList>

        <TabsContent value="style-guide">
          <StyleGuide />
        </TabsContent>

        <TabsContent value="presentation">
          <div className="flex justify-center">
            <PresentationDeck />
          </div>
        </TabsContent>

        <TabsContent value="map-style">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">TerraChain Custom Map Style</h2>
              <p className="mb-6">
                Our custom map style uses earthy tones that align with our brand identity, making land parcels and
                boundaries more visible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Custom TerraChain Style</h3>
                <GoogleMap height="400px" markers={markers} useCustomStyle={true} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Default Google Maps Style</h3>
                <GoogleMap height="400px" markers={markers} useCustomStyle={false} />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Custom Land Parcel Markers</h3>
              <p className="mb-4">
                We use custom markers to represent land parcels on the map, with different colors indicating
                verification status.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#4CAF50] rounded-full mr-2"></div>
                  <span>Verified Land Parcel</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#FFC107] rounded-full mr-2"></div>
                  <span>Pending Verification</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#F44336] rounded-full mr-2"></div>
                  <span>Disputed Land Parcel</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
