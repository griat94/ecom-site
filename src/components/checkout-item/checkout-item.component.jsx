import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles'

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem
  const { incrementItemQuantity, decrementItemQuantity, removeItemFromCart } =
    useContext(CartContext)

  const increaseQuantityHandler = () => incrementItemQuantity(checkoutItem)
  const decreaseQuantityHandler = () => decrementItemQuantity(checkoutItem)
  const removeItemHandler = () => removeItemFromCart(checkoutItem)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={decreaseQuantityHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
