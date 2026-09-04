import React from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/products"

const priceRanges = [
  { id: "all", label: "All prices", min: 0, max: Infinity },
  { id: "under-100", label: "Under $100", min: 0, max: 100 },
  { id: "100-300", label: "$100 - $300", min: 100, max: 300 },
  { id: "300-1000", label: "$300 - $1000", min: 300, max: 1000 },
  { id: "over-1000", label: "Over $1000", min: 1000, max: Infinity },
]

export { priceRanges }

export function ProductFilters({ selectedCategories, onCategoryChange, priceRange, onPriceRangeChange, onReset }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-auto p-0 text-xs text-muted-foreground">
          Clear all
        </Button>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-foreground">Category</h4>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => onCategoryChange(cat.id)}
              />
              <Label htmlFor={`cat-${cat.id}`} className="cursor-pointer font-normal text-muted-foreground">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-sm font-medium text-foreground">Price</h4>
        <div className="space-y-2.5">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center gap-2">
              <Checkbox
                id={`price-${range.id}`}
                checked={priceRange === range.id}
                onCheckedChange={() => onPriceRangeChange(range.id)}
              />
              <Label htmlFor={`price-${range.id}`} className="cursor-pointer font-normal text-muted-foreground">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
