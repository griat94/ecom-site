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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
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

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
