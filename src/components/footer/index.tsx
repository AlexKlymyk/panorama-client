import './index.scss'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer container">
      <h4 className="footer__title">Copyright © {currentYear} Panorama Loft & Garden</h4>
    </footer>
  )
}

export default Footer
