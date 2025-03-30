import { useTranslation } from 'react-i18next'
import './index.scss'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  const supportedLngs = i18n?.options?.supportedLngs
  const languages = supportedLngs && supportedLngs?.filter((lng: string) => lng !== 'cimode' && lng !== currentLanguage)
  
  return (
    <div className="language-switcher">
      <div className="language-switcher__button">
        <span className="language-switcher__button-text">
          {currentLanguage}
        </span>
        {/* <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg> */}
      </div>

      <ul className="language-switcher__list">
          {languages && languages.map((lng: string) => (
            <li
              key={lng}
              onClick={() => {
                i18n.changeLanguage(lng)
              }}
              className={"language-switcher__list-item"}
            >
              {lng}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default LanguageSwitcher
