import React from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/common/Rating"
import { PriceDisplay } from "@/components/common/PriceDisplay"
import { useCart } from "@/hooks/useCart"
import { cn } from "@/lib/utils"

export function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-foreground text-background">New</Badge>}
          {hasDiscount && <Badge variant="destructive">-{discountPercent}%</Badge>}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className={cn(
            "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-sm transition-colors hover:bg-background",
            inWishlist && "text-primary"
          )}
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-primary text-primary")} />
        </button>
        <Link
          to={`/products/${product.id}`}
          className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-1.5 rounded-md bg-background/95 py-2 text-xs font-medium opacity-0 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" /> View Details
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="sm" />
        </div>
        <Button
          onClick={() => addToCart(product, 1)}
          size="sm"
          className="mt-2 w-full gap-1.5"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  )
}
