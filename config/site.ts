export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "TerraChain",
  description: "AI x Blockchain-powered Land Record System",
  url: "https://terrachain.vercel.app",
  ogImage: "https://terrachain.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/terrachain",
    github: "https://github.com/ayushmorbar/terrachain",
  },
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
    { title: "Browse", href: "/browse" },
    { title: "Upload", href: "/upload-record" },
    { title: "TerraBot", href: "/terrabot" },
    { title: "Tools", href: "/tools" },
    { title: "Insights", href: "/insights" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  features: [
    {
      title: "Blockchain Security",
      description: "Immutable records secured by blockchain technology for tamper-proof documentation.",
      icon: "Shield",
    },
    {
      title: "AI Verification",
      description: "Advanced AI algorithms to verify document authenticity and detect potential fraud.",
      icon: "CheckCircle",
    },
    {
      title: "Seamless Integration",
      description: "Easy integration with existing land record systems and government databases.",
      icon: "ArrowRight",
    },
  ],
  team: [
    {
      name: "Ayush Morbar",
      role: "Founder & CEO, Offbeats",
      bio: "AI/ML and Blockchain enthusiast with a passion for land record management reform.",
      image: "/team/ayush-morbar.jpg",
    },
    {
      name: "Gaurav Soni",
      role: "Head of Chains and Block, Offbeats",
      bio: "Expert in blockchain technology and distributed systems.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Anonymous",
      role: "Head of Product - TerraChain, Offbeats",
      bio: "Experienced in government relations and land administration.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  testimonials: [
    {
      quote:
        "TerraChain has revolutionized how we manage land records in our district. The verification process is now 10x faster.",
      author: "Rajesh Kumar",
      title: "District Revenue Officer, Madhya Pradesh",
    },
    {
      quote:
        "The blockchain integration ensures that our land records are tamper-proof and transparent. A game-changer for rural India.",
      author: "Priya Singh",
      title: "Land Rights Activist",
    },
    {
      quote:
        "The AI-powered document verification has reduced fraud cases by 85% in our region. Impressive technology!",
      author: "Amit Patel",
      title: "Technology Officer, Gujarat Land Records Department",
    },
  ],
  roadmap: [
    {
      phase: "Q1 2026",
      title: "AI Price Predictor",
      description: "Launch of ML-based land price prediction tool",
    },
    {
      phase: "Q2 2026",
      title: "Voice-to-Text Uploader & ULPIN Deep Search",
      description: "Voice commands for record uploads and Unique Land Parcel Identification Number integration",
    },
    {
      phase: "Q3 2026",
      title: "Aadhaar-Linked e-KYC & Smart Land Dispute Detection",
      description: "Secure identity verification and AI-powered dispute resolution",
    },
    {
      phase: "Q4 2026",
      title: "Community Verification & Interactive GIS Mapping",
      description: "Decentralized verification system and advanced geographical visualization",
    },
  ],
}
