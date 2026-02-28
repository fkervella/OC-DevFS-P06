import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth/AuthProvider';
import './Header.css'

function Header() {
  const { logout, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  
  const handleLogout = async () => {
      await logout();
      navigate('/login');
  };

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
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link">Se déconnecter</button>
            ) :(
            <NavLink to="/Login" className="nav-link">Se connecter</NavLink>
            )}
        </nav>
      </div>
    </header>
  )
}

export default Header
