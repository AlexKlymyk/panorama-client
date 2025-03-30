import Header from './components/header'
import MainScreen from './components/main-screen'
import Contacts from './components/contacts'
import Footer from './components/footer'
import Menu from './components/menu'
import Sidebar from './components/sidebar'
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main>
        <MainScreen />
        <Menu />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}

export default App
