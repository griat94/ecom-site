import React from 'react'
import CategoryItem from '../category-item/category-item.component'

import { CategoryContainer } from './category-menu.styles'

const CategoryMenu = ({ categories }) => {
  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </CategoryContainer>
  )
}

export default CategoryMenu
