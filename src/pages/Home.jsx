import React from "react"
import { Link } from "react-router-dom"
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react"
import { HeroSection } from "@/components/layout/HeroSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { ProductGrid } from "@/components/product/ProductGrid"
import { CategoryCard } from "@/components/product/CategoryCard"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/data/products"

const benefits = [
  { icon: Truck, title: "Free Shipping", description: "On all orders over $75" },
  { icon: RotateCcw, title: "Easy Returns", description: "30-day return window" },
  { icon: ShieldCheck, title: "2-Year Warranty", description: "On every product" },
  { icon: Headphones, title: "24/7 Support", description: "We're here to help" },
]

export default function Home() {
  const featured = products.slice(0, 8)
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <div>
      <HeroSection />

      <section className="container py-14">
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured products"
          description="A selection of our most loved items this month."
          actionLabel="View all"
          actionHref="/products"
        />
        <div className="mt-8">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Up to 40% off select audio gear
          </h2>
          <p className="max-w-lg text-primary-foreground/90">
            For a limited time, save big on headphones, earbuds, and speakers. Elevate your sound
            without breaking the bank.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-2">
            <Link to="/products?category=audio">Shop the sale</Link>
          </Button>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading
          eyebrow="Just landed"
          title="New arrivals"
          description="The latest additions to our catalog."
          actionLabel="View all"
          actionHref="/products?sort=newest"
        />
        <div className="mt-8">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-14">
        <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
