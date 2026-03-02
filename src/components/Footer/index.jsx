import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>©Sportsee Tous droits réservés</div>
        <nav className="nav">
          <NavLink to="/gcu" className="nav-link">Conditions générales</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          <img src="./assets/logo1.png" alt="image qui bouge"/>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
