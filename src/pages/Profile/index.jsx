import styles from './Profile.module.css'

function Profile() {

  return (
    <div className={styles.page}>
      <div className={styles.infos}>
        <div className={styles.memberInfos}>
            <img src="./assets/avatar.jpg" alt="image du profil"/>
            <div>
                <div className={styles.memberName}>Clara Dupont</div>
                <div className={styles.memberSince}>Membre depuis le 14 juin 2023</div>
            </div>
        </div>
        <div className={styles.yourProfile}>
            <div className={styles.profileTitle}>Votre profil</div>
            <div className={styles.profileInfo}>Age : 29</div>
            <div className={styles.profileInfo}>Genre : Femme</div>
            <div className={styles.profileInfo}>Taille : 1m66</div>
            <div className={styles.profileInfo}>Poids: 58 kg</div>
        </div>
        <div className={styles.stats}>
            <h4>Vos statistiques</h4>
            <div className={styles.statsSubTitle}>depuis le 14 juin 2023</div>
            <div className={styles.statsValues}>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Temps total couru</div>
                    <div className={styles.stat}><span className={styles.statValue}>27h</span><span className={styles.statUnit}> 15min</span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Calories brulées</div>
                    <div className={styles.stat}><span className={styles.statValue}>25000</span><span className={styles.statUnit}> cal</span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Distance totale parcourue</div>
                    <div className={styles.stat}><span className={styles.statValue}>312</span><span className={styles.statUnit}> km</span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Nombre de jours de repos</div>
                    <div className={styles.stat}><span className={styles.statValue}>9</span><span className={styles.statUnit}> jours </span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Nombre de sessions</div>
                    <div className={styles.stat}><span className={styles.statValue}>41</span><span className={styles.statUnit}> sessions</span></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
