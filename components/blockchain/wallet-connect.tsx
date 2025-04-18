"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink } from "lucide-react"
import { formatAddress } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export function WalletConnect() {
  const [walletState, setWalletState] = useState<{
    connected: boolean
    address?: string
    balance?: string
    network?: string
    error?: string
    loading: boolean
  }>({
    connected: false,
    loading: true,
  })

  useEffect(() => {
    const checkConnection = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if MetaMask is installed
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          // Check if already connected
          const accounts = await window.ethereum.request({ method: "eth_accounts" })

          if (accounts.length > 0) {
            // Get network and balance
            const network = await window.ethereum.request({ method: "eth_chainId" })
            const balance = await window.ethereum.request({
              method: "eth_getBalance",
              params: [accounts[0], "latest"],
            })

            // Convert balance from wei to ETH
            const balanceInEth = Number.parseInt(balance) / 1e18

            setWalletState({
              connected: true,
              address: accounts[0],
              balance: balanceInEth.toFixed(4),
              network: getNetworkName(network),
              loading: false,
            })
          } else {
            setWalletState({
              connected: false,
              loading: false,
            })
          }
        } catch (error) {
          setWalletState({
            connected: false,
            error: "Error checking wallet connection",
            loading: false,
          })
        }
      } else {
        setWalletState({
          connected: false,
          error: "MetaMask not installed",
          loading: false,
        })
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async () => {
    setWalletState({ ...walletState, loading: true })

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        // Get network and balance
        const network = await window.ethereum.request({ method: "eth_chainId" })
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        // Convert balance from wei to ETH
        const balanceInEth = Number.parseInt(balance) / 1e18

        setWalletState({
          connected: true,
          address: accounts[0],
          balance: balanceInEth.toFixed(4),
          network: getNetworkName(network),
          loading: false,
        })
      } catch (error) {
        setWalletState({
          connected: false,
          error: "User rejected connection",
          loading: false,
        })
      }
    } else {
      setWalletState({
        connected: false,
        error: "MetaMask not installed",
        loading: false,
      })
    }
  }

  const getNetworkName = (chainId: string) => {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet"
      case "0x5":
        return "Goerli Testnet"
      case "0xaa36a7":
        return "Sepolia Testnet"
      case "0x13881":
        return "Mumbai Testnet"
      default:
        return "Unknown Network"
    }
  }

  if (walletState.loading) {
    return (
      <Button variant="outline" size="sm" disabled className="h-9">
        <span className="animate-pulse">Checking wallet...</span>
      </Button>
    )
  }

  if (walletState.connected && walletState.address) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Wallet className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline mr-1">Wallet:</span>
            <span>{formatAddress(walletState.address)}</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
            <DialogDescription>Your wallet is connected to TerraChain</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Address</p>
              <div className="flex items-center justify-between rounded-md border p-3">
                <code className="text-sm">{walletState.address}</code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigator.clipboard.writeText(walletState.address || "")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-copy"
                        >
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Balance</p>
                <div className="rounded-md border p-3">
                  <p className="text-sm">{walletState.balance} ETH</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Network</p>
                <div className="rounded-md border p-3">
                  <Badge variant={walletState.network?.includes("Mainnet") ? "default" : "secondary"}>
                    {walletState.network}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => window.open(`https://etherscan.io/address/${walletState.address}`, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Etherscan
              </Button>
              <Button variant="destructive" onClick={() => setWalletState({ connected: false, loading: false })}>
                Disconnect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (walletState.error === "MetaMask not installed") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => window.open("https://metamask.io/download/", "_blank")}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Install MetaMask
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>MetaMask is required to use TerraChain</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Button size="sm" className="h-9" onClick={handleConnect}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  )
}
