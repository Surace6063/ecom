import React from "react"
import { PackageSearch } from "lucide-react"
import { ProductCard } from "@/components/product/ProductCard"
import { EmptyState } from "@/components/common/EmptyState"

export function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try adjusting your filters or search term to find what you're looking for."
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
