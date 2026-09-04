import React from "react"
import { formatPrice, cn } from "@/lib/utils"

export function PriceDisplay({ price, discountPrice, size = "md", className }) {
  const hasDiscount = discountPrice != null && discountPrice < price
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-bold text-foreground", textSize)}>
        {formatPrice(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-muted-foreground line-through">{formatPrice(price)}</span>
      )}
    </div>
  )
}
