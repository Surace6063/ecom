import React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, className }) {
  return (
    <div className={cn("inline-flex items-center rounded-md border border-input", className)}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="flex h-9 w-9 items-center justify-center rounded-l-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="flex h-9 w-10 items-center justify-center text-sm font-medium">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-9 w-9 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
