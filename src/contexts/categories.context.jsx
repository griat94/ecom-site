import { createContext, useEffect, useMemo, useState } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => null,
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, [])

  const value = useMemo(() => {
    return { categoriesMap, setCategoriesMap }
  }, [categoriesMap, setCategoriesMap])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
