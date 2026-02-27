import { useState } from 'react'
import styles from './Login.module.css'

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.leftColumn}>
        <div className={styles.logoBrand}>
            <img className={styles.logo} src="./assets/logo1.png" alt="logo"/>
            <span className={styles.brand}>SPORTSEE</span>
        </div>
        <div className={styles.informations}>
          <h3>Transformez vos stats en résultats</h3>
          <h4>Se connecter</h4>
          <form>
            <label htmlFor="mail">Adresse email</label>
            <input type="text" id="mail"/>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password"/>
            <button type="submit">Se connecter</button>
          </form>
          <a>Mot de passe oublié ?</a>
        </div>
      </div>
      <div className={styles.rightColumn}>
          <img src="./assets/connexion.jpg" alt="image page d'acceuil"/>
          <div className={styles.explaination}>Analysez vos performances en un clin d oeil, suivez vos progrès et atteignez vos objectifs.</div>
      </div>
    </div>
  )
}

export default LoginPage
