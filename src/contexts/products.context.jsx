import { createContext, useEffect, useMemo, useState } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
    }
    getCategoriesMap()
  }, [])

  const value = useMemo(() => {
    return { products, setProducts }
  }, [products, setProducts])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
