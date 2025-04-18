import { Bell, TrendingUp, Mic, Search, Fingerprint, AlertTriangle, CheckSquare, Map } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockComingSoonFeatures } from "@/lib/mock-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge className="mb-2">Roadmap</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Coming Soon to TerraChain</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Exciting new features and enhancements on our development roadmap
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockComingSoonFeatures.map((feature) => (
                <Card key={feature.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{feature.eta}</Badge>
                    </div>
                    <CardTitle className="mt-2">{feature.name}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {feature.icon === "TrendingUp" && <TrendingUp className="h-10 w-10" />}
                      {feature.icon === "Mic" && <Mic className="h-10 w-10" />}
                      {feature.icon === "Search" && <Search className="h-10 w-10" />}
                      {feature.icon === "Fingerprint" && <Fingerprint className="h-10 w-10" />}
                      {feature.icon === "AlertTriangle" && <AlertTriangle className="h-10 w-10" />}
                      {feature.icon === "Vote" && <CheckSquare className="h-10 w-10" />}
                      {feature.icon === "Map" && <Map className="h-10 w-10" />}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Expected release: <span className="font-medium">{feature.eta}</span>
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Updated</h2>
              <p className="max-w-[700px] text-primary-foreground/90 md:text-xl">
                Subscribe to our newsletter to receive updates on new features and releases.
              </p>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-foreground" />
                <Button variant="secondary">
                  <Bell className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
