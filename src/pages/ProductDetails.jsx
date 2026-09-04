import React, { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Heart, ShoppingCart, Zap, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rating } from "@/components/common/Rating"
import { PriceDisplay } from "@/components/common/PriceDisplay"
import { QuantitySelector } from "@/components/common/QuantitySelector"
import { SectionHeading } from "@/components/common/SectionHeading"
import { ProductGrid } from "@/components/product/ProductGrid"
import { useCart } from "@/hooks/useCart"
import { getProductById, getRelatedProducts } from "@/data/products"
import { cn } from "@/lib/utils"
import NotFound from "@/pages/NotFound"

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) return <NotFound />

  const relatedProducts = getRelatedProducts(product)
  const inWishlist = isInWishlist(product.id)

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate("/checkout")
  }

  return (
    <div className="container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/products">Products</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={product.images?.[activeImage] ?? product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {(product.images ?? [product.image]).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors",
                  activeImage === i ? "border-primary" : "border-transparent"
                )}
              >
                <img src={img} alt={`${product.title} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">{product.category}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {product.title}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} size="md" />
            <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            {product.isNew && <Badge>New</Badge>}
          </div>

          <div className="mt-5">
            <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="lg" />
            {product.stock > 0 ? (
              <p className="mt-1 text-sm text-emerald-600">In stock — {product.stock} available</p>
            ) : (
              <p className="mt-1 text-sm text-destructive">Out of stock</p>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <Separator className="my-6" />

          <div className="flex flex-wrap items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <Button
              size="lg"
              className="flex-1 gap-2 sm:flex-none"
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1 gap-2 sm:flex-none"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Zap className="h-4 w-4" /> Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-primary text-primary")} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="h-4 w-4 shrink-0 text-primary" /> Free shipping over $75
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RotateCcw className="h-4 w-4 shrink-0 text-primary" /> 30-day returns
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> 2-year warranty
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Product Information</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="text-sm leading-relaxed text-muted-foreground">
            <p>{product.description}</p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li><span className="font-medium text-foreground">Category:</span> {product.category}</li>
              <li><span className="font-medium text-foreground">Stock:</span> {product.stock} units</li>
              <li><span className="font-medium text-foreground">Rating:</span> {product.rating} / 5</li>
              <li><span className="font-medium text-foreground">SKU:</span> VRV-{product.id.toString().padStart(4, "0")}</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="text-sm text-muted-foreground">
            This product has {product.reviews} reviews with an average rating of {product.rating} out of 5.
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-14">
          <SectionHeading title="You may also like" />
          <div className="mt-8">
            <ProductGrid products={relatedProducts} />
          </div>
        </div>
      )}
    </div>
  )
}
