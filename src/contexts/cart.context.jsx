import { createContext, useEffect, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  // const cartItemIndex = cartItems.findIndex(
  //   (item) => item.id === productToAdd.id
  // )

  // cartItemIndex === -1
  //   ? cartItems.push({ ...productToAdd, quantity: 1 })
  //   : cartItems[cartItemIndex].quantity++

  // return cartItems

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

const removeItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  incrementItemQuantity: () => {},
  decrementItemQuantity: () => {},
  removeItemFromCart: () => {},
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    )
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const incrementItemQuantity = (productToUpdate) => {
    setCartItems(incrementQuantity(cartItems, productToUpdate))
  }

  const decrementItemQuantity = (productToUpdate) => {
    setCartItems(decrementQuantity(cartItems, productToUpdate))
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeItem(cartItems, productToRemove))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
