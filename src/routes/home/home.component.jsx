import CategoryMenu from '../../components/category-menu/category-menu.component'
import categories from '../../utils/json/categories-data.json'

const Home = () => {
  return <CategoryMenu categories={categories} />
}

export default Home
