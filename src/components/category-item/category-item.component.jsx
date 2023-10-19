import {
  CategoryItemContainer,
  BackgroundImage,
  Body,
} from './category-item.styles'

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category

  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  )
}

export default CategoryItem
