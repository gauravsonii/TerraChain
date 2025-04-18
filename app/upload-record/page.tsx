"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2,
  X,
  Calendar,
  MapPin,
  ArrowRight,
  FileCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { api } from "@/lib/mock-api"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IPFSDocumentUpload } from "@/components/blockchain/ipfs-document-upload"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

export default function UploadRecordPage() {
  const [step, setStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [documentHash, setDocumentHash] = useState<string>("")
  const [transactionState, setTransactionState] = useState<{
    status: "idle" | "pending" | "success" | "error"
    hash?: string
    error?: string
  }>({
    status: "idle",
  })
  const [formData, setFormData] = useState({
    ownerName: "",
    landArea: "",
    location: "",
    district: "",
    acquisitionDate: "",
    cropHistory: "",
    additionalNotes: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create a preview URL for the file
      const reader = new FileReader()
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)

      // Reset analysis state
      setAnalysisResult(null)
    }
  }

  const handleAnalyzeDocument = async () => {
    if (!file) return

    setAnalyzing(true)

    try {
      const result = await api.analyzeDocument(file)
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing document:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleDocumentUpload = (hash: string) => {
    setDocumentHash(hash)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!documentHash) {
      alert("Please upload a document to IPFS before submitting.")
      return
    }

    setTransactionState({ status: "pending" })

    try {
      // Format crop history as JSON string
      const cropHistoryJson = JSON.stringify({
        crops: formData.cropHistory?.split(",").map((crop) => crop.trim()) || [],
        lastUpdated: new Date().toISOString(),
      })

      // Submit to blockchain via mock API
      const result = await api.createLandRecord({
        ...formData,
        cropHistory: cropHistoryJson,
        documentHash,
      })

      if (result.success) {
        setTransactionState({
          status: "success",
          hash: result.transactionHash,
        })

        // Reset form after successful submission
        setTimeout(() => {
          setStep(1)
          setFile(null)
          setFilePreview(null)
          setAnalysisResult(null)
          setDocumentHash("")
          setFormData({
            ownerName: "",
            landArea: "",
            location: "",
            district: "",
            acquisitionDate: "",
            cropHistory: "",
            additionalNotes: "",
          })
          setTransactionState({ status: "idle" })
        }, 5000)
      } else {
        setTransactionState({
          status: "error",
          error: "Failed to submit record to blockchain",
        })
      }
    } catch (error) {
      console.error("Error submitting land record:", error)
      setTransactionState({
        status: "error",
        error: "An unexpected error occurred",
      })
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"}`}
            >
              <FileText className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Upload</span>
          </div>
          <div className="flex-1 mx-4">
            <div className={`h-1 w-full rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"}`}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Analyze</span>
          </div>
          <div className="flex-1 mx-4">
            <div className={`h-1 w-full rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"}`}
            >
              <Upload className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Submit</span>
          </div>
        </div>
      </div>
    )
  }

  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
          {filePreview ? (
            <div className="space-y-4 w-full">
              <div className="relative mx-auto max-w-md">
                <img
                  src={filePreview || "/placeholder.svg"}
                  alt="Document preview"
                  className="rounded-lg border shadow-sm max-h-[300px] mx-auto"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={() => {
                    setFile(null)
                    setFilePreview(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm">
                <p className="font-medium">{file?.name}</p>
                <p className="text-muted-foreground">{file?.size ? (file.size / 1024 / 1024).toFixed(2) : "0"} MB</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                <Upload className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Upload Land Document</h3>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop your document here, or click to browse</p>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="max-w-sm"
              />
              <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
            </>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setStep(2)} disabled={!file} className="gap-2">
            Continue to Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="border rounded-lg p-4 w-1/3">
            <div className="aspect-[3/4] bg-muted rounded-md mb-4 flex items-center justify-center overflow-hidden">
              {filePreview && (
                <img
                  src={filePreview || "/placeholder.svg"}
                  alt="Document preview"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="text-sm">
              <p className="font-medium truncate">{file?.name}</p>
              <p className="text-muted-foreground">{file?.size ? (file.size / 1024 / 1024).toFixed(2) : "0"} MB</p>
            </div>
          </div>

          <div className="flex-1 border rounded-lg p-6">
            {analyzing ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Analyzing document...</p>
                <Progress value={45} className="w-full max-w-xs mt-4" />
              </div>
            ) : analysisResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Analysis Results</h3>
                  <Badge
                    className={
                      analysisResult.anomalyScore > 70
                        ? "bg-red-500"
                        : analysisResult.anomalyScore > 40
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }
                  >
                    {analysisResult.anomalyScore > 70
                      ? "High Risk"
                      : analysisResult.anomalyScore > 40
                        ? "Medium Risk"
                        : "Low Risk"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Anomaly Score</span>
                    <span className="text-sm font-medium">{analysisResult.anomalyScore}/100</span>
                  </div>
                  <Progress
                    value={analysisResult.anomalyScore}
                    className="h-2"
                    indicatorClassName={
                      analysisResult.anomalyScore > 70
                        ? "bg-red-500"
                        : analysisResult.anomalyScore > 40
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }
                  />
                </div>

                {analysisResult.anomalies.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Detected Issues:</h4>
                    <ul className="space-y-2">
                      {analysisResult.anomalies.map((anomaly: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                          <span className="text-sm">{anomaly}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Alert
                  className={
                    analysisResult.anomalyScore > 70
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : analysisResult.anomalyScore > 40
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-green-500/10 text-green-500 border-green-500/20"
                  }
                >
                  <AlertTitle className="flex items-center">
                    {analysisResult.anomalyScore > 70 ? (
                      <AlertTriangle className="h-4 w-4 mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    {analysisResult.recommendation}
                  </AlertTitle>
                  <AlertDescription>
                    {analysisResult.anomalyScore > 70
                      ? "This document has significant issues that need to be addressed before proceeding."
                      : analysisResult.anomalyScore > 40
                        ? "This document has some minor issues that should be reviewed."
                        : "This document appears to be valid and can be processed."}
                  </AlertDescription>
                </Alert>

                <div className="pt-4">
                  <Badge variant="outline" className="mb-2">
                    AI Auto Detection Coming Soon
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Our advanced AI detection system will soon be able to automatically identify and highlight specific
                    issues in your documents.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready for Analysis</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                  Our AI will analyze your document for potential issues, inconsistencies, and verify its authenticity.
                </p>
                <Button onClick={handleAnalyzeDocument}>Start Analysis</Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button onClick={() => setStep(3)} disabled={!analysisResult}>
            Continue to Submission
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <TransactionStatus
          status={transactionState.status}
          transactionHash={transactionState.hash}
          errorMessage={transactionState.error}
          onDismiss={() => setTransactionState({ status: "idle" })}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                name="ownerName"
                placeholder="Enter owner's full name"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="landArea">Land Area (acres)</Label>
              <Input
                id="landArea"
                name="landArea"
                type="number"
                step="0.01"
                placeholder="e.g. 5.2"
                value={formData.landArea}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                placeholder="Enter address or plot number"
                className="pl-9"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select value={formData.district} onValueChange={(value) => handleSelectChange("district", value)}>
                <SelectTrigger id="district">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="south">South District</SelectItem>
                  <SelectItem value="east">East District</SelectItem>
                  <SelectItem value="west">West District</SelectItem>
                  <SelectItem value="central">Central District</SelectItem>
                  <SelectItem value="bhopal">Bhopal</SelectItem>
                  <SelectItem value="indore">Indore</SelectItem>
                  <SelectItem value="jabalpur">Jabalpur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="acquisitionDate">Acquisition Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="acquisitionDate"
                  name="acquisitionDate"
                  type="date"
                  className="pl-9"
                  value={formData.acquisitionDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cropHistory">Crop History</Label>
            <Textarea
              id="cropHistory"
              name="cropHistory"
              placeholder="Enter comma-separated list of crops grown on this land"
              value={formData.cropHistory}
              onChange={handleInputChange}
              className="resize-none"
            />
          </div>

          <IPFSDocumentUpload onUploadComplete={handleDocumentUpload} documentHash={documentHash} />

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Any additional information about the land"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              className="resize-none"
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button type="submit" disabled={transactionState.status === "pending" || !documentHash}>
              {transactionState.status === "pending" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit to Blockchain"
              )}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Upload Land Record</h1>
              <p className="text-muted-foreground">
                Add a new land record to the blockchain for secure, transparent storage.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>New Land Record</CardTitle>
                <CardDescription>
                  Follow the steps to upload, analyze, and submit your land record to the blockchain.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepIndicator()}

                <Tabs value={`step-${step}`} className="mt-6">
                  <TabsContent value="step-1" className={step === 1 ? "block" : "hidden"}>
                    {renderStep1()}
                  </TabsContent>
                  <TabsContent value="step-2" className={step === 2 ? "block" : "hidden"}>
                    {renderStep2()}
                  </TabsContent>
                  <TabsContent value="step-3" className={step === 3 ? "block" : "hidden"}>
                    {renderStep3()}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
