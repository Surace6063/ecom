import React from "react"
import { Link } from "react-router-dom"
import { Share2, AtSign, Send, ShoppingBag, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/products" },
      { label: "New Arrivals", to: "/products?sort=newest" },
      { label: "Best Sellers", to: "/products?sort=rating" },
      { label: "Deals", to: "/products?sort=discount" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", to: "/" },
      { label: "Shipping Info", to: "/" },
      { label: "Returns", to: "/" },
      { label: "FAQs", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Press", to: "/" },
      { label: "Sustainability", to: "/" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-foreground">Verve</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Thoughtfully designed tech and lifestyle products, delivered to your door.
            </p>
            <div className="mt-4 flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="Share" className="hover:text-foreground"><Share2 className="h-4 w-4" /></a>
              <a href="#" aria-label="Contact" className="hover:text-foreground"><AtSign className="h-4 w-4" /></a>
              <a href="#" aria-label="Message" className="hover:text-foreground"><Send className="h-4 w-4" /></a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>Get 10% off your first order — subscribe to our newsletter.</span>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm gap-2">
            <Input type="email" placeholder="Your email" required />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Verve. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
