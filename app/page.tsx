import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { RoadmapSection } from "@/components/home/roadmap-section"
import { StatsSection } from "@/components/home/stats-section"
import { ComingSoonSection } from "@/components/home/coming-soon-section"
import { PartnersSection } from "@/components/home/partners-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <RoadmapSection />
        <ComingSoonSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
