"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, CheckCircle, Loader2, X, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"

interface IPFSDocumentUploadProps {
  onUploadComplete: (hash: string) => void
  documentHash: string
}

export function IPFSDocumentUpload({ onUploadComplete, documentHash }: IPFSDocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 300)

    // Simulate IPFS upload delay
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Generate a mock IPFS hash
      const mockHash = `Qm${Array.from(
        { length: 44 },
        () => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 62)],
      ).join("")}`

      onUploadComplete(mockHash)
      setUploading(false)
    }, 3000)
  }

  const resetUpload = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (documentHash) {
    return (
      <div className="rounded-lg border p-4 bg-green-500/10">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium">Document Uploaded to IPFS</p>
            <p className="text-sm text-muted-foreground">Your document has been securely stored on IPFS.</p>
            <div className="flex items-center mt-2">
              <Label className="text-sm mr-2">IPFS Hash:</Label>
              <code className="bg-background px-2 py-1 rounded text-xs">
                {documentHash.substring(0, 6)}...{documentHash.substring(documentHash.length - 6)}
              </code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Label>Upload Document to IPFS</Label>
      <div className="rounded-lg border p-4">
        {file && !uploading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={resetUpload}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleUpload} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload to IPFS
            </Button>
          </div>
        ) : uploading ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
              <div>
                <p className="font-medium text-sm">Uploading to IPFS...</p>
                <p className="text-xs text-muted-foreground">{file?.name}</p>
              </div>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              {uploadProgress < 100 ? "Uploading document to decentralized storage..." : "Finalizing upload..."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">Upload Document to IPFS</p>
            <p className="text-xs text-muted-foreground mb-4 text-center">
              Store your document on the decentralized IPFS network for secure, tamper-proof storage
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Select Document
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
