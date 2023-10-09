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
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>

      <span className='quantity'>
        <div className='arrow' onClick={decreaseQuantity}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={increaseQuantity}>
          &#10095;
        </div>
      </span>

      <span className='price'>${price}</span>
      <div className='remove-button' onClick={removeItem}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
