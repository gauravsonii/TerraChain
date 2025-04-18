"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, User, Bot, Loader2, Info, Volume2, Copy, ExternalLink, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { api } from "@/lib/mock-api"
import { mockTerrabotResponses } from "@/lib/mock-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: { title: string; url: string }[]
}

export default function TerraBot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: mockTerrabotResponses.greeting,
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await api.askTerraBot(input)

      if (response.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.response,
          timestamp: new Date(),
          sources: response.sources,
        }

        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Error getting response from TerraBot:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = () => {
    // Mock voice recording functionality
    setIsRecording(true)

    setTimeout(() => {
      setIsRecording(false)

      const demoQuestion = "What documents are required for land registration in India?"
      setInput(demoQuestion)

      // Auto-submit after a short delay
      setTimeout(() => {
        const event = new Event("submit", { cancelable: true, bubbles: true })
        document.getElementById("chat-form")?.dispatchEvent(event)
      }, 500)
    }, 2000)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleTextToSpeech = (content: string) => {
    const utterance = new SpeechSynthesisUtterance(content)
    utterance.lang = "en-IN"
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Bot className="mr-2 h-5 w-5 text-primary" />
                        TerraBot Assistant
                      </CardTitle>
                      <CardDescription>Your AI assistant for land records and Indian land laws</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      Beta v0.1
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="flex-shrink-0 mr-3">
                            {message.role === "user" ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm">{message.content}</div>
                            {message.sources && (
                              <div className="mt-2 pt-2 border-t border-border/50">
                                <p className="text-xs font-medium mb-1">Sources:</p>
                                <div className="flex flex-wrap gap-2">
                                  {message.sources.map((source, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                      >
                                        {source.title}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                      </a>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {message.role === "assistant" && (
                              <div className="flex items-center space-x-2 mt-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => handleCopyMessage(message.content)}
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Copy to clipboard</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => handleTextToSpeech(message.content)}
                                      >
                                        <Volume2 className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Text to speech</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                          <div className="flex-shrink-0 mr-3">
                            <Bot className="h-6 w-6" />
                          </div>
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <form id="chat-form" onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Ask about land records, laws, or verification..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading || isRecording}
                      className="flex-1"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={handleVoiceInput}
                            disabled={isLoading || isRecording}
                          >
                            {isRecording ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center">
                            <p>Voice input (Demo)</p>
                            <Badge variant="outline" className="ml-2">
                              Beta
                            </Badge>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button type="submit" size="icon" disabled={!input.trim() || isLoading || isRecording}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                  <CardTitle>TerraBot Guide</CardTitle>
                  <CardDescription>How to get the most out of your AI assistant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 overflow-auto">
                  <Tabs defaultValue="examples">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                      <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                      <TabsTrigger value="limitations">Limitations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="examples" className="space-y-4 mt-4">
                      <div>
                        <h3 className="font-medium mb-2">Try asking:</h3>
                        <div className="space-y-2">
                          {[
                            "What documents are required for land registration in India?",
                            "How can I verify a land record?",
                            "What is the process for resolving land disputes?",
                            "Explain the Land Acquisition Act of 2013",
                            "What is ULPIN and how does it work?",
                          ].map((example, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start h-auto py-2 px-3 text-left"
                              onClick={() => {
                                setInput(example)
                                // Focus the input
                                document.querySelector("input")?.focus()
                              }}
                            >
                              <span className="truncate">{example}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="capabilities" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/10 p-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Indian Land Laws</p>
                            <p className="text-sm text-muted-foreground">
                              Information about land registration, ownership, and legal frameworks
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/10 p-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Document Requirements</p>
                            <p className="text-sm text-muted-foreground">
                              Details about necessary documents for land transactions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/10 p-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Verification Processes</p>
                            <p className="text-sm text-muted-foreground">Steps to verify land records and ownership</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-green-500/10 p-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Dispute Resolution</p>
                            <p className="text-sm text-muted-foreground">
                              Information about resolving land disputes in India
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="limitations" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-yellow-500/10 p-1">
                            <Info className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <p className="font-medium">Not Legal Advice</p>
                            <p className="text-sm text-muted-foreground">
                              TerraBot provides information but not legal advice
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-yellow-500/10 p-1">
                            <Info className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <p className="font-medium">Limited to Knowledge Base</p>
                            <p className="text-sm text-muted-foreground">Only knows information in its training data</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-yellow-500/10 p-1">
                            <Info className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <p className="font-medium">No Real-time Data</p>
                            <p className="text-sm text-muted-foreground">
                              Cannot access current land records or real-time information
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Alert className="mt-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Advanced AI Mode Coming Soon</AlertTitle>
                    <AlertDescription>
                      Our upcoming update will include document analysis, multilingual support, and integration with
                      government databases.
                    </AlertDescription>
                  </Alert>

                  <div className="border rounded-lg p-4 mt-4">
                    <h3 className="font-medium mb-2">Language Support</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Badge>English</Badge>
                        <span className="text-xs text-green-500">Active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Hindi</Badge>
                        <span className="text-xs text-yellow-500">Beta</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Tamil</Badge>
                        <span className="text-xs">Coming Soon</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Telugu</Badge>
                        <span className="text-xs">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
