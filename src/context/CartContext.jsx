import React, { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(undefined)

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStorage("cart", []))
  const [wishlist, setWishlist] = useState(() => readStorage("wishlist", []))

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => setCartItems([])

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) return prev.filter((item) => item.id !== product.id)
      return [...prev, product]
    })
  }

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  )

  const value = {
    cartItems,
    wishlist,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    cartCount,
    cartSubtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
