import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/config/site"

export default function AboutPage() {
  // Ensure team exists and is an array
  const teamMembers = Array.isArray(siteConfig.team) ? siteConfig.team : []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About TerraChain</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Revolutionizing land record management with blockchain technology and AI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  TerraChain aims to transform land record management in India by leveraging blockchain technology to
                  create secure, transparent, and tamper-proof land records. Our platform combines the immutability of
                  blockchain with the intelligence of AI to verify document authenticity and streamline the land
                  registration process.
                </p>
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We envision a future where land disputes are minimized, property transactions are seamless, and land
                  records are accessible to all stakeholders. By digitizing and securing land records on the blockchain,
                  we aim to reduce fraud, increase transparency, and build trust in the land administration system.
                </p>
              </div>
              <img
                alt="About TerraChain"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg?height=310&width=550"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Meet the passionate individuals behind TerraChain.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center space-y-4">
                  <img
                    src={member.image || "/placeholder.svg?height=200&width=200"}
                    alt={member.name}
                    className="rounded-full h-40 w-40 object-cover"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                    <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
