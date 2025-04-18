import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InfoGraphicProps {
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
  variant?: "default" | "bordered" | "gradient"
}

export function InfoGraphic({ title, description, icon, className, children, variant = "default" }: InfoGraphicProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        variant === "gradient" && "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
        variant === "bordered" && "border-2 border-primary/20",
        className,
      )}
    >
      <CardHeader className="pb-2">
        {icon && <div className="mb-2 text-primary">{icon}</div>}
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
