"use client"

import { AlertCircle, CheckCircle, Loader2, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface TransactionStatusProps {
  status: "idle" | "pending" | "success" | "error"
  transactionHash?: string
  errorMessage?: string
  onDismiss?: () => void
}

export function TransactionStatus({ status, transactionHash, errorMessage, onDismiss }: TransactionStatusProps) {
  if (status === "idle") return null

  if (status === "pending") {
    return (
      <Alert className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <AlertTitle>Transaction in Progress</AlertTitle>
        <AlertDescription>
          Your transaction is being processed on the blockchain. This may take a few moments.
        </AlertDescription>
      </Alert>
    )
  }

  if (status === "success") {
    return (
      <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
        <CheckCircle className="h-4 w-4 mr-2" />
        <AlertTitle>Transaction Successful</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>Your land record has been successfully added to the blockchain.</p>
          {transactionHash && (
            <div className="flex items-center space-x-2 text-sm">
              <span>Transaction Hash:</span>
              <code className="bg-green-500/10 px-2 py-1 rounded">{`${transactionHash.substring(
                0,
                6,
              )}...${transactionHash.substring(transactionHash.length - 6)}`}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          )}
          {onDismiss && (
            <Button variant="outline" size="sm" onClick={onDismiss} className="mt-2">
              Dismiss
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertTitle>Transaction Failed</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>{errorMessage || "There was an error processing your transaction. Please try again."}</p>
          {onDismiss && (
            <Button variant="outline" size="sm" onClick={onDismiss} className="mt-2">
              Dismiss
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
