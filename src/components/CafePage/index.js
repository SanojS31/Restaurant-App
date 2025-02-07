import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import CafeNavBar from '../CafeNavBar'
import MenuItems from '../MenuItems'
import './index.css'

const Category = {
  salads: 'Salads and Soup',
}

const status = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const CafePage = () => {
  const [cafeData, setCafeData] = useState([])
  const [activeCategory, setCategory] = useState(Category.salads)
  const [apiStatus, setApiStatus] = useState(status.initial)

  useEffect(() => {
    setApiStatus(status.loading)
    const fetchData = async () => {
      const dishesApiUrl =
        'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
      const options = {
        method: 'GET',
      }
      const response = await fetch(dishesApiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        setCafeData(data[0].table_menu_list)
        setApiStatus(status.success)
      }
    }
    fetchData()
  }, [])

  const loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
    </div>
  )

  const successView = () => (
    <MenuItems cafeData={cafeData} activeCategory={activeCategory} />
  )

  const switchCase = () => {
    switch (apiStatus) {
      case status.loading:
        return loadingView()
      case status.success:
        return successView()
      default:
        return null
    }
  }

  return (
    <>
      <CafeNavBar />
      <div className="category-list">
        {cafeData.map(e => (
          <button
            className={`category-item  category-item:hover ${
              activeCategory === e.menu_category
                ? 'is-active-category-item'
                : 'is-inactive-category-item '
            }`}
            key={e.menu_category_id}
            onClick={() => setCategory(e.menu_category)}
            type="button"
          >
            {e.menu_category}
          </button>
        ))}
      </div>
      {switchCase()}
    </>
  )
}

export default CafePage
