import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(38)}`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "verified":
      return "bg-green-500 dark:bg-green-600"
    case "pending":
      return "bg-yellow-500 dark:bg-yellow-600"
    case "disputed":
      return "bg-red-500 dark:bg-red-600"
    default:
      return "bg-gray-500 dark:bg-gray-600"
  }
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function generateMockId(prefix = "TC"): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${randomPart}`
}
