import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const carouselRef = React.useRef(null)

    const scrollPrev = React.useCallback(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" })
      }
    }, [])

    const scrollNext = React.useCallback(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" })
      }
    }, [])

    const handleScroll = React.useCallback(() => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft
        const scrollWidth = carouselRef.current.scrollWidth
        const clientWidth = carouselRef.current.clientWidth

        setCanScrollPrev(scrollLeft > 0)
        setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1)
      }
    }, [])

    React.useEffect(() => {
      const carousel = carouselRef.current
      if (carousel) {
        carousel.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => carousel.removeEventListener("scroll", handleScroll)
      }
    }, [handleScroll])

    React.useImperativeHandle(
      ref,
      () => ({
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollTo: (index) => {
          if (carouselRef.current) {
            carouselRef.current.scrollTo({
              left: index * carouselRef.current.offsetWidth,
              behavior: "smooth",
            })
          }
        },
      }),
      [scrollPrev, scrollNext, canScrollPrev, canScrollNext]
    )

    const value = React.useMemo(
      () => ({
        carouselRef,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        currentIndex,
        setCurrentIndex,
      }),
      [carouselRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext, currentIndex]
    )

    return (
      <CarouselContext.Provider value={value}>
        <div
          ref={carouselRef}
          className={cn("relative overflow-hidden", className)}
          {...props}
        >
          <div className="flex h-full w-full">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-full w-full", className)}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full h-full", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { canScrollPrev, scrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-left-12 top-1/2 -translate-y-1/2"
        : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { canScrollNext, scrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-right-12 top-1/2 -translate-y-1/2"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
