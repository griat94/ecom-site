import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
  const { cartItems } = useContext(CartContext)
  console.log(cartItems)
  return (
    <div>
      {cartItems.map((checkoutItem) => (
        <CheckoutItem key={checkoutItem.id} checkoutItem={checkoutItem} />
      ))}
    </div>
  )
}

export default Checkout
