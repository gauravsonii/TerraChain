"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about TerraChain and land record management
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is TerraChain?</AccordionTrigger>
                <AccordionContent>
                  TerraChain is a secure, AI-powered app to view and verify Indian land records transparently using
                  blockchain. It combines artificial intelligence with blockchain security to create a tamper-proof
                  system for land record management, making it easier for landowners, government agencies, and other
                  stakeholders to access and verify land ownership information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I authenticate myself on TerraChain?</AccordionTrigger>
                <AccordionContent>
                  TerraChain offers multiple secure authentication options. You can use DigiLocker or Meri Pehchaan for
                  government-verified identity authentication. These methods ensure that your identity is securely
                  verified using official government identity systems, providing a high level of security and trust.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is this legally approved?</AccordionTrigger>
                <AccordionContent>
                  It's a citizen utility and does not replace official portals, but integrates verified data where
                  possible. TerraChain serves as a complementary tool to existing government systems, providing
                  additional transparency and security through blockchain technology. While the records on TerraChain
                  are verified and secure, official land transactions should still be processed through the appropriate
                  government channels.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I contact support?</AccordionTrigger>
                <AccordionContent>
                  Use the Contact form or TerraBot for common queries. Our TerraBot assistant is available 24/7 to
                  answer frequently asked questions and provide guidance on using the platform. For more complex issues
                  or specific inquiries, you can reach our support team through the Contact form on our website. We
                  typically respond within 24-48 hours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How does blockchain verify land records?</AccordionTrigger>
                <AccordionContent>
                  Blockchain technology creates an immutable ledger of land record transactions. When a land record is
                  added to TerraChain, it's stored as a transaction on the blockchain with a unique hash. This hash
                  serves as a digital fingerprint that can be used to verify the authenticity of the record. Any attempt
                  to alter the record would change the hash, making it immediately apparent that the record has been
                  tampered with.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>What is ULPIN and how does it work with TerraChain?</AccordionTrigger>
                <AccordionContent>
                  ULPIN (Unique Land Parcel Identification Number) is a 14-digit unique ID assigned to every land parcel
                  in India. TerraChain integrates with ULPIN to provide a standardized way of identifying and searching
                  for land parcels. By using ULPIN, TerraChain can link blockchain records to official government
                  records, creating a more comprehensive and reliable system for land record management.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Can I use TerraChain on my mobile device?</AccordionTrigger>
                <AccordionContent>
                  Yes, TerraChain is fully responsive and works on mobile devices, tablets, and desktop computers. You
                  can access all features of the platform through your mobile browser. For the best experience, we
                  recommend using the latest version of Chrome, Safari, or Firefox. The platform is designed to be
                  mobile-friendly, allowing you to access and manage your land records on the go.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How secure is my data on TerraChain?</AccordionTrigger>
                <AccordionContent>
                  TerraChain uses advanced encryption and blockchain technology to ensure the security of your data.
                  Land records are stored on the blockchain, which provides an immutable and transparent record of all
                  transactions. Personal information is encrypted and stored securely, with access controlled through
                  your authenticated government identity. We follow industry best practices for data security and
                  privacy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>How do I upload my land documents to TerraChain?</AccordionTrigger>
                <AccordionContent>
                  You can upload your land documents through our secure document upload feature. Navigate to the "Upload
                  Document" section in your dashboard, select the document type, and upload your file (PDF, JPEG, or PNG
                  format). Our AI system will analyze the document for authenticity and extract relevant information.
                  Once verified, the document will be securely stored and linked to the blockchain for tamper-proof
                  record-keeping.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>What types of land documents can I upload?</AccordionTrigger>
                <AccordionContent>
                  TerraChain supports various types of land documents, including land deeds, property tax receipts,
                  mutation records, survey documents, and other official land-related documents. The platform can
                  process documents in PDF, JPEG, and PNG formats. For best results, ensure that your documents are
                  clearly scanned or photographed with all text visible and legible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger>How does the AI verification process work?</AccordionTrigger>
                <AccordionContent>
                  Our AI verification system uses advanced document analysis techniques to verify the authenticity of
                  uploaded land documents. The system checks for document structure, official seals and signatures, and
                  cross-references information with available government databases where possible. It can detect
                  potential anomalies or inconsistencies that might indicate fraudulent documents. This provides an
                  additional layer of security and trust in the land record verification process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger>Is TerraChain available across all states in India?</AccordionTrigger>
                <AccordionContent>
                  TerraChain is designed to work across all states in India, but the level of integration with local
                  government systems may vary by state. We are continuously working to expand our coverage and improve
                  integration with state-specific land record systems. Our goal is to provide a unified platform for
                  land record management across the entire country, regardless of local variations in record-keeping
                  systems.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Still have questions? We're here to help.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="outline">Contact Support</Button>
                </Link>
                <Button onClick={() => window.open("mailto:support@terrachain.io")}>Email Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
