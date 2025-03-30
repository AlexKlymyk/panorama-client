import './index.scss'
import Navigation from '../navigation'
import LanguageSwitcher from '../language-switcher'

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean, setIsSidebarOpen: (isOpen: boolean) => void }) {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__header">
        <LanguageSwitcher />
        <button 
          className="sidebar__close"
          onClick={() => setIsSidebarOpen(false)}
        >
          ×
        </button>
      </div>
      <div className="sidebar__content">
        <Navigation onItemClick={() => setIsSidebarOpen(false)} />
      </div>
    </div>
  )
}

export default Sidebar
