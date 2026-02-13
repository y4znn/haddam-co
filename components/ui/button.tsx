"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useMotionTemplate, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSoundEngine } from "@/hooks/use-sound-engine"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 focus-visible:ring-destructive/40 bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground bg-input/30 border-input hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20",
        solid: "bg-brand-orange text-[var(--text-on-accent)] hover:bg-cyan-600 shadow-lg hover:shadow-[0_0_25px_var(--color-brand-orange)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-14 rounded-xl px-8 text-lg font-bold tracking-wide has-[>svg]:px-6",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  magnetic?: boolean
  sheen?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = false, sheen = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [isHovered, setIsHovered] = React.useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const { playTick, playPress, playRelease } = useSoundEngine()

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (magnetic && !asChild && !isLoading) {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const left = rect.left
        const top = rect.top
        const centerX = left + width / 2
        const centerY = top + height / 2
        const dX = e.clientX - centerX
        const dY = e.clientY - centerY
        mouseX.set(dX * 0.15)
        mouseY.set(dY * 0.15)
      }
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
      setIsHovered(false)
    }

    // Liquid Metal Sheen Gradient
    const sheenGradient = useMotionTemplate`linear-gradient(
        110deg,
        transparent,
        rgba(255, 255, 255, 0.1) 45%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.1) 55%,
        transparent
    )`

    // Interactive motion wrapper for the button content
    const MotionWrapper = asChild ? React.Fragment : motion.button

    const motionProps = asChild ? {} : {
      whileTap: { scale: 0.97 },
      animate: isLoading ? { scale: [1, 0.97, 1], transition: { repeat: Infinity, duration: 1.5 } } : {},
      transition: { type: "spring", stiffness: 400, damping: 17 },
      style: magnetic ? { x: mouseX, y: mouseY } : {}
    }

    return (
      <MotionWrapper
        {...motionProps as any}
        className={cn(buttonVariants({ variant, size, className }), isLoading && "cursor-wait opacity-90", "will-change-transform")}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true)
          playTick()
        }}
        onMouseDown={() => playPress()}
        onMouseUp={() => playRelease()}
        onMouseLeave={handleMouseLeave}
        disabled={isLoading}
        {...props}
        ref={asChild ? (ref as any) : ref}
      >
        {/* Liquid Metal Sheen Layer */}
        {sheen && isHovered && !asChild && !isLoading && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
              repeatDelay: 0.5
            }}
            style={{ background: sheenGradient }}
          />
        )}

        {/* Loading Pulse Overlay */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-white/20 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}

        <div className="relative z-20 flex items-center justify-center gap-2">
          {children}
        </div>
      </MotionWrapper>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
