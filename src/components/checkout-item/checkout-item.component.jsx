import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import Button from '../button/button.component'

import './checkout-item.styles.scss'

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem
  const { incrementItemQuantity, decrementItemQuantity, removeItemFromCart } =
    useContext(CartContext)

  const increaseQuantity = () => incrementItemQuantity(checkoutItem)

  const decreaseQuantity = () => decrementItemQuantity(checkoutItem)

  const removeItem = () => removeItemFromCart(checkoutItem)

  return (
    <div>
      <img src={imageUrl} alt={`${name}`} />
      <span>{name}</span>

      <Button onClick={decreaseQuantity}>-</Button>
      <span>{quantity}</span>
      <Button onClick={increaseQuantity}>+</Button>

      <span>{quantity * price}</span>
      <Button onClick={removeItem}>X</Button>
    </div>
  )
}

export default CheckoutItem
