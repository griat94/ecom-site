import { useNavigate } from 'react-router-dom'
import {
  CategoryItemContainer,
  BackgroundImage,
  Body,
} from './category-item.styles'

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category
  const navigate = useNavigate()

  const navigateToCategoryHandler = (title) =>
    navigate(`/shop/${title.toLowerCase()}`)

  return (
    <CategoryItemContainer onClick={() => navigateToCategoryHandler(title)}>
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  )
}

export default CategoryItem
