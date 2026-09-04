import React from "react"
import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { QuantitySelector } from "@/components/common/QuantitySelector"
import { PriceDisplay } from "@/components/common/PriceDisplay"
import { useCart } from "@/hooks/useCart"

export function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
  const unitPrice = item.discountPrice ?? item.price

  return (
    <div className="flex gap-4 py-5">
      <Link to={`/products/${item.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border sm:h-24 sm:w-24">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <Link to={`/products/${item.id}`} className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary sm:text-base">
            {item.title}
          </Link>
          <p className="mt-0.5 text-xs capitalize text-muted-foreground">{item.category}</p>
          <p className="mt-2 text-sm font-medium text-foreground sm:hidden">
            <PriceDisplay price={item.price} discountPrice={item.discountPrice} size="sm" />
          </p>
        </div>

        <div className="hidden sm:block">
          <PriceDisplay price={item.price} discountPrice={item.discountPrice} size="sm" />
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
          />
          <span className="w-16 text-right text-sm font-semibold text-foreground">
            ${(unitPrice * item.quantity).toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            aria-label="Remove item"
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
