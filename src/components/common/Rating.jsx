import React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Rating({ value = 0, reviews, size = "sm", className }) {
  const starSize = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {value.toFixed(1)}
        {typeof reviews === "number" && <span> ({reviews})</span>}
      </span>
    </div>
  )
}
