import React, { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { CreditCard, Truck, PackageCheck, Landmark } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"

const shippingOptions = [
  { id: "standard", label: "Standard (5-7 days)", price: 0 },
  { id: "express", label: "Express (2-3 days)", price: 14.99 },
  { id: "overnight", label: "Overnight", price: 29.99 },
]

export default function Checkout() {
  const { cartItems, cartSubtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [placed, setPlaced] = useState(false)

  const shippingCost = shippingOptions.find((o) => o.id === shippingMethod)?.price ?? 0
  const total = cartSubtotal + shippingCost

  if (cartItems.length === 0 && !placed) {
    return <Navigate to="/cart" replace />
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="container flex max-w-lg flex-col items-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <PackageCheck className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Order placed successfully!</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for your order. A confirmation email has been sent to you. This is a demo checkout —
          no real payment was processed.
        </p>
        <Button className="mt-8" onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-foreground">Customer Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" required />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-foreground">Shipping Address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="address">Street address</Label>
                <Input id="address" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="postal">Postal code</Label>
                <Input id="postal" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="np">Nepal</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <Truck className="h-4 w-4" /> Shipping Method
            </h2>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="mt-4">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
                >
                  <span className="flex items-center gap-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    {option.label}
                  </span>
                  <span className="font-medium text-foreground">
                    {option.price === 0 ? "Free" : formatPrice(option.price)}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <CreditCard className="h-4 w-4" /> Payment Method
            </h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-4">
              <label
                htmlFor="card"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
              >
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-4 w-4 text-muted-foreground" /> Credit / Debit Card
              </label>
              <label
                htmlFor="bank"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
              >
                <RadioGroupItem value="bank" id="bank" />
                <Landmark className="h-4 w-4 text-muted-foreground" /> Bank Transfer
              </label>
            </RadioGroup>

            {paymentMethod === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            )}

            <Alert className="mt-4">
              <AlertTitle className="text-xs">Demo checkout</AlertTitle>
              <AlertDescription className="text-xs">
                This is a frontend-only demo. No real payment will be processed.
              </AlertDescription>
            </Alert>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24 p-6">
            <h2 className="font-semibold text-foreground">Order Summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img src={item.image} alt={item.title} className="h-12 w-12 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                  </div>
                  <span className="shrink-0 font-medium text-foreground">
                    {formatPrice((item.discountPrice ?? item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex justify-between text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full">
              Place Order
            </Button>
          </Card>
        </div>
      </form>
    </div>
  )
}
