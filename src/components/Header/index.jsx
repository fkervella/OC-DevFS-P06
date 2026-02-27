import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logoBrand">
            <img className="logo" src="./assets/logo1.png" alt="logo"/>
            <span className="brand">SPORTSEE</span>
        </div>
        <nav className="nav">
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/profile" className="nav-link">Mon profil</NavLink>
          <div>|</div>
          <NavLink to="/LogIn" className="nav-link">Se connecter</NavLink>
          <NavLink to="/LogOut" className="nav-link">Se déconnecter</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
