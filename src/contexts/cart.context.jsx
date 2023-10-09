import { createContext, useEffect, useMemo, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const incrementQuantity = (cartItems, productToUpdate) => {
  const checkoutItemToUpdate = cartItems.find(
    (cartItem) => cartItem.id === productToUpdate.id
  )

  if (!checkoutItemToUpdate) return cartItems

  return cartItems.map((cartItem) =>
    cartItem.id === productToUpdate.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  )
}

const decrementQuantity = (cartItems, productToUpdate) => {
  const checkoutItemToUpdate = cartItems.find(
    (cartItem) => cartItem.id === productToUpdate.id
  )

  if (!checkoutItemToUpdate) return cartItems

  if (checkoutItemToUpdate.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== checkoutItemToUpdate.id
    )
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === productToUpdate.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
  }
}

const removeItem = (cartItems, productToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  incrementItemQuantity: () => {},
  decrementItemQuantity: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    )
  }, [cartItems])

  useEffect(() => {
    setCartTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
    )
  }, [cartItems])

  const addItemToCart = useMemo(() => {
    return (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd))
    }
  }, [cartItems])

  const incrementItemQuantity = useMemo(() => {
    return (productToUpdate) => {
      setCartItems(incrementQuantity(cartItems, productToUpdate))
    }
  }, [cartItems])

  const decrementItemQuantity = useMemo(() => {
    return (productToUpdate) => {
      setCartItems(decrementQuantity(cartItems, productToUpdate))
    }
  }, [cartItems])

  const removeItemFromCart = useMemo(() => {
    return (productToRemove) => {
      setCartItems(removeItem(cartItems, productToRemove))
    }
  }, [cartItems])

  const value = useMemo(() => {
    return {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      cartCount,
      incrementItemQuantity,
      decrementItemQuantity,
      removeItemFromCart,
      cartTotal,
    }
  }, [
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
    cartTotal,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
