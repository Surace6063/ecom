import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function SectionHeading({ eyebrow, title, description, actionLabel, actionHref, className }) {
  return (
    <div className={cn("flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end", className)}>
      <div>
        {eyebrow && (
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link
          to={actionHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
