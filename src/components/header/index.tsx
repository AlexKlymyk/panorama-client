import './index.scss'
import Navigation from '../navigation'
// import logoMini from '../../assets/images/logo/logo-mini.svg'
import logoMiniWhite from '../../assets/images/logo/logo-mini-white.svg'
import LanguageSwitcher from '../language-switcher'

function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (isOpen: boolean) => void }) {
  return (
    <header className={"header container"}>
      <a href={"/"} className={"header__logo"}>
        <img src={logoMiniWhite} alt="logo" />
        <div>
          <span>PANORAMA</span>
          <span>LOFT & GARDEN</span>
        </div>
      </a>
      <div className="header__navigation">
        <Navigation onItemClick={() => {}} />
      </div>
      <div className="header__language-switcher">
        <LanguageSwitcher />
      </div>

      <button 
        className="header__burger"
        onClick={() => setIsSidebarOpen(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}

export default Header