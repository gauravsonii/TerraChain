import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/ui/logo"
import { Mascot } from "@/components/ui/mascot"

export function StyleGuide() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">TerraChain Brand Style Guide</h1>

      <Tabs defaultValue="colors">
        <TabsList className="mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
          <TabsTrigger value="mascot">Mascot</TabsTrigger>
          <TabsTrigger value="illustrations">Illustrations</TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>
                The TerraChain color palette is inspired by earth tones and modern tech aesthetics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Primary" hex="#4CAF50" className="bg-primary" />
                <ColorSwatch name="Secondary" hex="#8A6D3B" className="bg-[#8A6D3B] text-white" />
                <ColorSwatch name="Accent" hex="#2196F3" className="bg-[#2196F3] text-white" />
                <ColorSwatch name="Background" hex="#FFFFFF" className="bg-background border" />
                <ColorSwatch name="Foreground" hex="#1A1A1A" className="bg-foreground text-white" />
                <ColorSwatch name="Muted" hex="#F5F5F5" className="bg-muted" />
                <ColorSwatch name="Success" hex="#4CAF50" className="bg-[#4CAF50] text-white" />
                <ColorSwatch name="Warning" hex="#FF9800" className="bg-[#FF9800] text-white" />
                <ColorSwatch name="Destructive" hex="#F44336" className="bg-destructive text-white" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>TerraChain uses Inter as its primary font family.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h6 className="text-sm font-medium mb-2">Headings</h6>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">Heading 1</div>
                    <div className="text-3xl font-bold">Heading 2</div>
                    <div className="text-2xl font-bold">Heading 3</div>
                    <div className="text-xl font-bold">Heading 4</div>
                    <div className="text-lg font-bold">Heading 5</div>
                    <div className="text-base font-bold">Heading 6</div>
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-medium mb-2">Body Text</h6>
                  <div className="space-y-2">
                    <p className="text-base">
                      Regular paragraph text. TerraChain is a comprehensive platform that combines AI intelligence with
                      blockchain security for transparent, tamper-proof land record management in India.
                    </p>
                    <p className="text-sm">Small text for captions and secondary information.</p>
                    <p className="text-xs">Extra small text for legal information and footnotes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logos">
          <Card>
            <CardHeader>
              <CardTitle>Logo Variations</CardTitle>
              <CardDescription>
                The TerraChain logo represents the fusion of technology and land management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="p-6 bg-white rounded-lg shadow-sm mb-2">
                    <Logo size="lg" showText={true} />
                  </div>
                  <span className="text-sm">Primary Logo</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-6 bg-white rounded-lg shadow-sm mb-2">
                    <Logo size="lg" showText={false} />
                  </div>
                  <span className="text-sm">Icon Only</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-6 bg-slate-800 rounded-lg shadow-sm mb-2">
                    <Logo size="lg" showText={true} />
                  </div>
                  <span className="text-sm">Dark Background</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mascot">
          <Card>
            <CardHeader>
              <CardTitle>Terra - Brand Mascot</CardTitle>
              <CardDescription>Terra is our friendly mascot who guides users through the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <Mascot variant="default" size="lg" />
                  <span className="text-sm mt-2">Default</span>
                </div>

                <div className="flex flex-col items-center">
                  <Mascot variant="waving" size="lg" />
                  <span className="text-sm mt-2">Waving</span>
                </div>

                <div className="flex flex-col items-center">
                  <Mascot variant="pointing" size="lg" />
                  <span className="text-sm mt-2">Pointing</span>
                </div>

                <div className="flex flex-col items-center">
                  <Mascot variant="thinking" size="lg" />
                  <span className="text-sm mt-2">Thinking</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Mascot with Speech Bubble</h3>
                <div className="flex justify-center">
                  <Mascot
                    variant="default"
                    size="lg"
                    withSpeechBubble={true}
                    speechText="Hi! I'm Terra, your land records assistant!"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="illustrations">
          <Card>
            <CardHeader>
              <CardTitle>Brand Illustrations</CardTitle>
              <CardDescription>
                Custom illustrations that represent the TerraChain brand and its features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <IllustrationCard
                  title="Blockchain Security"
                  description="Represents the secure blockchain technology behind TerraChain."
                  imagePath="/images/illustrations/blockchain-security.png"
                />

                <IllustrationCard
                  title="AI Assistant"
                  description="Represents TerraBot, our AI-powered assistant."
                  imagePath="/images/illustrations/ai-assistant.png"
                />

                <IllustrationCard
                  title="Land Records"
                  description="Represents the digital transformation of land records."
                  imagePath="/images/illustrations/land-records.png"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ColorSwatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex flex-col">
      <div className={`h-20 rounded-md ${className} flex items-end p-2`}>
        <span className="text-xs font-mono">{hex}</span>
      </div>
      <span className="text-sm mt-1">{name}</span>
    </div>
  )
}

function IllustrationCard({
  title,
  description,
  imagePath,
}: { title: string; description: string; imagePath: string }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-48 bg-muted flex items-center justify-center">
        <img src={imagePath || "/placeholder.svg"} alt={title} className="max-h-full" />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}
