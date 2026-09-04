import React from "react"
import { Link } from "react-router-dom"

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-muted"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <span className="relative z-10 mt-auto pb-4 text-sm font-semibold text-white">{category.name}</span>
    </Link>
  )
}
