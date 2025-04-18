import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TopBar } from "@/components/dashboard/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, Video, MessageSquare, HelpCircle } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1 overflow-auto p-6 bg-neutral">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex items-center justify-between py-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Help Center</h2>
              <p className="text-muted-foreground">Find answers to your questions about LandChain</p>
            </div>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input placeholder="Search for help articles..." className="pl-10 py-6 text-lg" />
          </div>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="guides">
                <FileText className="h-4 w-4 mr-2" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="support">
                <MessageSquare className="h-4 w-4 mr-2" />
                Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Common questions about using LandChain</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is LandChain?</AccordionTrigger>
                      <AccordionContent>
                        LandChain is a blockchain-based land record management system that provides secure, transparent,
                        and immutable storage of land ownership records. It uses Ethereum smart contracts to create a
                        tamper-proof record of land ownership and history.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I add a new land record?</AccordionTrigger>
                      <AccordionContent>
                        To add a new land record, navigate to the "Add Record" page from the dashboard. Fill in the
                        required information about the land, upload any relevant documents to IPFS, and submit the form.
                        The record will be stored on the blockchain after confirmation.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What is IPFS and how is it used in LandChain?</AccordionTrigger>
                      <AccordionContent>
                        IPFS (InterPlanetary File System) is a decentralized storage system used by LandChain to store
                        land documents such as deeds, certificates, and maps. When you upload a document, it's stored on
                        IPFS and a hash reference to that document is stored on the blockchain, ensuring the document
                        cannot be tampered with.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I verify a land record?</AccordionTrigger>
                      <AccordionContent>
                        You can verify a land record by viewing its details page and clicking on "Verify on Blockchain."
                        This will show you the transaction details on Etherscan, confirming that the record exists on
                        the blockchain. You can also verify the associated documents by viewing them on IPFS.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Do I need a cryptocurrency wallet to use LandChain?</AccordionTrigger>
                      <AccordionContent>
                        Yes, you need a MetaMask wallet or another Ethereum-compatible wallet to interact with the
                        blockchain features of LandChain. This wallet is used to sign transactions when adding or
                        updating land records.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>How secure is the data on LandChain?</AccordionTrigger>
                      <AccordionContent>
                        Data on LandChain is highly secure due to the use of blockchain technology. Once a record is
                        added to the blockchain, it cannot be altered or deleted. Document hashes stored on the
                        blockchain ensure that the original documents cannot be tampered with without detection.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Guides</CardTitle>
                  <CardDescription>Step-by-step guides to using LandChain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Getting Started with LandChain</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-500 mb-4">
                          Learn how to set up your account, connect your wallet, and navigate the dashboard.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Guide
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Adding Your First Land Record</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-500 mb-4">
                          A complete walkthrough of adding a new land record to the blockchain.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Guide
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Working with IPFS Documents</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-500 mb-4">
                          How to upload, view, and verify documents stored on IPFS.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Guide
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Understanding Blockchain Verification</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-500 mb-4">
                          Learn how to verify records on the blockchain and understand transaction details.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Guide
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Watch step-by-step video guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Video Thumbnail"
                          className="rounded-md object-cover w-full h-full"
                        />
                        <div className="absolute">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white opacity-80"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Introduction to LandChain</h3>
                      <p className="text-sm text-gray-500">5:32 • Overview of the platform and its features</p>
                    </div>
                    <div>
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Video Thumbnail"
                          className="rounded-md object-cover w-full h-full"
                        />
                        <div className="absolute">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white opacity-80"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Setting Up Your Wallet</h3>
                      <p className="text-sm text-gray-500">7:15 • How to connect MetaMask to LandChain</p>
                    </div>
                    <div>
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Video Thumbnail"
                          className="rounded-md object-cover w-full h-full"
                        />
                        <div className="absolute">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white opacity-80"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Adding a Land Record</h3>
                      <p className="text-sm text-gray-500">10:23 • Complete walkthrough of adding a record</p>
                    </div>
                    <div>
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Video Thumbnail"
                          className="rounded-md object-cover w-full h-full"
                        />
                        <div className="absolute">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white opacity-80"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Verifying Records on the Blockchain</h3>
                      <p className="text-sm text-gray-500">
                        8:45 • Learn how to verify and validate blockchain records
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Submit a Support Ticket</h3>
                      <p className="text-gray-500">
                        Our support team typically responds within 24 hours during business days.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="support-subject">Subject</Label>
                          <Input id="support-subject" placeholder="Brief description of your issue" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="support-message">Message</Label>
                          <Textarea
                            id="support-message"
                            placeholder="Please provide details about your issue"
                            className="min-h-[150px] resize-none"
                          />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Submit Ticket
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Other Ways to Get Help</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium">Email Support</h4>
                          <p className="text-sm text-gray-500 mt-1">Send an email to support@landchain.io</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium">Phone Support</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Call us at +91 755 123 4567 (Mon-Fri, 9am-6pm IST)
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium">Community Forum</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Join our community forum to get help from other users
                          </p>
                          <Button variant="link" className="p-0 h-auto text-primary mt-1">
                            Visit Forum
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
