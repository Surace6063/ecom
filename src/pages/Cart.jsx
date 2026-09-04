import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { CartItem } from "@/components/cart/CartItem"
import { EmptyState } from "@/components/common/EmptyState"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"

export default function Cart() {
  const { cartItems, cartSubtotal } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)

  const shipping = cartSubtotal > 75 || cartItems.length === 0 ? 0 : 9.99
  const discount = discountApplied ? cartSubtotal * 0.1 : 0
  const total = cartSubtotal + shipping - discount

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setDiscountApplied(true)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start exploring our collection."
          actionLabel="Start Shopping"
          onAction={() => (window.location.href = "/products")}
        />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
      <p className="mt-1 text-muted-foreground">{cartItems.length} item(s) in your cart</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <Card className="divide-y divide-border p-5">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Card>

        <div>
          <Card className="p-6">
            <h2 className="font-semibold text-foreground">Order Summary</h2>

            <form onSubmit={handleApplyPromo} className="mt-4 flex gap-2">
              <Input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code (try SAVE10)"
              />
              <Button type="submit" variant="secondary" className="shrink-0 gap-1.5">
                <Tag className="h-4 w-4" /> Apply
              </Button>
            </form>

            <Separator className="my-5" />

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount (SAVE10)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <Separator className="my-5" />

            <div className="flex justify-between text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Button asChild size="lg" className="mt-6 w-full">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full gap-1.5">
              <Link to="/products">
                <ArrowLeft className="h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
