import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

const heroSlides = [
  {
    id: 1,
    title: "Tech that fits your life.",
    description: "Discover thoughtfully designed audio, wearables, and gear built to make everyday moments better — curated, tested, and backed by a 2-year warranty.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    imageAlt: "Wireless headphones",
  },
  {
    id: 2,
    title: "Premium audio experience.",
    description: "Immerse yourself in crystal-clear sound with our curated collection of premium headphones and speakers.",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
    imageAlt: "Premium audio equipment",
  },
  {
    id: 3,
    title: "Wearables for modern life.",
    description: "Stay connected and track your fitness goals with our selection of smartwatches and wearable tech.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    imageAlt: "Smartwatch and laptop",
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/50">
      <div className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Free shipping on orders over $75
          </span>
          <Carousel className="mt-5 w-full">
            <CarouselContent>
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id} className="flex flex-col justify-center">
                  <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Tech that fits <span className="text-primary">your life.</span>
                  </h1>
                  <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="lg" asChild>
                      <Link to="/products">
                        Shop the collection
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/products?sort=newest">New arrivals</Link>
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="relative">
          <div className="absolute -top-8 right-8 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
              alt="Wireless headphones"
              className="col-span-2 h-56 w-full rounded-2xl object-cover shadow-lg sm:h-64"
            />
            <img
              src="https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&q=80"
              alt="Smartwatch"
              className="h-32 w-full rounded-2xl object-cover shadow-lg sm:h-40"
            />
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"
              alt="Laptop"
              className="h-32 w-full rounded-2xl object-cover shadow-lg sm:h-40"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
