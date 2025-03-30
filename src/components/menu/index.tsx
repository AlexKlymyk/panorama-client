import './index.scss'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useEffect, useState } from 'react'
import noImage from '../../assets/images/no-image.svg'

interface MenuData {
  [key: string]: {
    id: number
    category: string
    items: MenuItem[]
    isDrinks: boolean
  }[]
}

interface MenuItem {
  id: number
  title: string
  description: string
  isNew: boolean
  price: number
  image: {
    formats: {
      thumbnail: {
        url: string
      },
      large: {
        url: string
      }
    }
  }
}

interface MenuCategory {
  id: number
  locale: string
  category: string
  localizations: MenuCategory[]
  menu_items: MenuItem[]
  isDrinks: boolean
}

function Menu() {
  const serverUrl = 'http://localhost:1337'
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const [menu, setMenu] = useState<MenuData>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const tabs = {
    food: {
      title: t('menu.food'),
      value: 'food',
    },
    drinks: {
      title: t('menu.drinks'),
      value: 'drinks',
    },
  }
  const [tab, setTab] = useState<string>(tabs.food.value)

  useEffect(() => {
    const url = `${serverUrl}/api/menus?populate[localizations][populate][menu_items][populate]=image&populate[menu_items][populate]=image&locale=pt&sort=order:asc`

    setIsLoading(true)
    axios
      .get(url)
      .then((res) => {
        handleResponse(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleResponse = (res: { data: { data: MenuCategory[] } }) => {
    const resData = res?.data?.data
    const nextMenu: MenuData = {}

    resData.forEach((item: MenuCategory) => {
      const menuItem = {
        id: item.id,
        category: item.category,
        items: item.menu_items,
        isDrinks: item.isDrinks,
      }
      if (!nextMenu[item.locale]) {
        nextMenu[item.locale] = []
      }
      nextMenu[item.locale].push(menuItem)

      item.localizations.forEach((localization: MenuCategory) => {
        const menuItem = {
          id: localization.id,
          category: localization.category,
          items: localization.menu_items,
          isDrinks: localization.isDrinks,
        }
        if (!nextMenu[localization.locale]) {
          nextMenu[localization.locale] = []
        }
        nextMenu[localization.locale].push(menuItem)
      })
    })
    
    setMenu(nextMenu)
  }

  return (
    <div className="menu container" id="menu">
      {isModalOpen && (
        <div className="menu__modal" onClick={() => setIsModalOpen(false)}>
          <div className="menu__modal-content">
            <button className="menu__modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <img src={selectedImage} alt="Large menu item" />
          </div>
        </div>
      )}
      
      <div className="menu__header">
        <h3 className="menu__title">{t('menu.title')}</h3>
        <div className="menu__tabs">
          {Object.values(tabs).map((tabItem) => (
            <div
              key={tabItem.value}
              className={`menu__tab ${tabItem.value === tab ? 'menu__tab--active' : ''}`}
              onClick={() => setTab(tabItem.value)}
              >
                {tabItem.title}
              </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="menu__loader">
          <div className="menu__loader-spinner"></div>
        </div>
      ) : (
        <div key={locale} className="menu__wrapper">
          {menu[locale]?.map((item) => {
            if (tab === tabs.food.value && item.isDrinks) return null
            if (tab === tabs.drinks.value && !item.isDrinks) return null
            const menuItems = item.items
            return (
              <div className="menu__category" key={item.id}>
                <h4 className="menu__category-title">{item.category}</h4>
                {menuItems?.map((menuItem) => {
                  const imageUrl = menuItem.image?.formats?.thumbnail?.url
                  const imagePath = `${serverUrl}${imageUrl}`
                  const imageSrc = imageUrl ? imagePath : noImage
                  return (
                    <div className="menu__item" key={menuItem.id}>
                      <div className="menu__item-content-wrapper">
                        <div 
                          className={`menu__item-image ${!imageUrl ? 'menu__item-image--no-image' : ''}`}
                          onClick={() => {
                            if (imageUrl) {
                              setSelectedImage(`${serverUrl}${menuItem.image.formats.large.url}`)
                              setIsModalOpen(true)
                            }
                          }}
                        >
                          <img src={imageSrc} alt={menuItem.title} />
                        </div>
                        <div className="menu__item-content">
                          <div className="menu__item-title-wrapper">
                            <h5 className="menu__item-title">{menuItem.title}</h5>
                            {menuItem.isNew && <span className="menu__item-new">{t('menu.new')}</span>}
                          </div>
                          {menuItem.description && (
                            <p className="menu__item-description">{menuItem.description}</p>
                          )}
                        </div>
                        <div className="menu__item-price">
                          {menuItem.price}
                        </div>
                      </div>
                      {menuItem.description && (
                        <p className="menu__item-description menu__item-description--mobile">{menuItem.description}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Menu
