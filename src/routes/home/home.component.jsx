import CategoryMenu from '../../components/category-menu/category-menu.component'
import { categories } from '../../utils/constants'

import '../../components/category-item/category-item.styles.scss'

const Home = () => {
  return <CategoryMenu categories={categories} />
}

export default Home
