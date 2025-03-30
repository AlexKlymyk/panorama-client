import './index.scss'
import { useTranslation } from 'react-i18next'

function MainScreen() {
  const { t } = useTranslation()

  return (
    <div className={"main-screen container"}>
      <div className={"main-screen__content"}>
        <h1 className={"main-screen__title"}>PANORAMA</h1>
        <h2 className={"main-screen__subtitle"}>LOFT & GARDEN</h2>
        <h3 className={"main-screen__description"}>
          {t('main-screen.description')}
        </h3>
        <a className={"main-screen__button"} href="https://www.thefork.pt/restaurante/panorama-loft-garden-r829941" target="_blank" rel="noreferrer">
          {t('main-screen.button')}
        </a>
      </div>
    </div>
  )
}

export default MainScreen