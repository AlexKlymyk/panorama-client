import './index.scss'
import { useTranslation } from 'react-i18next'

function Navigation({ onItemClick }: { onItemClick: () => void }) {
  const { t } = useTranslation()

  return (
    <nav className={"navigation"}>
      <ul className={"navigation__list"}>
        <li className={"navigation__list-item"}>
          <a href="#" onClick={onItemClick}>{t('navigation.home')}</a>
        </li>
        <li className={"navigation__list-item"}>
          <a href="#menu" onClick={onItemClick}>{t('navigation.menu')}</a>
        </li>
        <li className={"navigation__list-item"}>
          <a href="#contacts" onClick={onItemClick}>{t('navigation.contacts')}</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation