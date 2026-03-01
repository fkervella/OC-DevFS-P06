import styles from './Profile.module.css'
import userProfile from '../../../data/user-info.js'

function Profile() {

  return (
    <div className={styles.page}>
      <div className={styles.infos}>
        <div className={styles.memberInfos}>
            <img src={userProfile.profile.profilePicture} alt="image du profil"/>
            <div>
                <div className={styles.memberName}>{userProfile.profile.firstName} {userProfile.profile.lastName}</div>
                <div className={styles.memberSince}>Membre depuis le {userProfile.profile.createdAt}</div>
            </div>
        </div>
        <div className={styles.yourProfile}>
            <div className={styles.profileTitle}>Votre profil</div>
            <div className={styles.profileInfo}>Age : {userProfile.profile.age}</div>
            <div className={styles.profileInfo}>Genre : {userProfile.profile.gender}</div>
            <div className={styles.profileInfo}>Taille : {userProfile.profile.height} cm</div>
            <div className={styles.profileInfo}>Poids: {userProfile.profile.weight} kg</div>
        </div>
        <div className={styles.stats}>
            <h4>Vos statistiques</h4>
            <div className={styles.statsSubTitle}>depuis le {userProfile.profile.createdAt}</div>
            <div className={styles.statsValues}>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Temps total couru</div>
                    <div className={styles.stat}><span className={styles.statValue}>{userProfile.statistics.totalDuration}h</span><span className={styles.statUnit}> 0min</span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Calories brulées</div>
                    <div className={styles.stat}><span className={styles.statValue}>{userProfile.statistics.totalCalories}</span><span className={styles.statUnit}> cal</span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Distance totale parcourue</div>
                    <div className={styles.stat}><span className={styles.statValue}>{userProfile.statistics.totalDistance}</span><span className={styles.statUnit}> km</span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Nombre de jours de repos</div>
                    <div className={styles.stat}><span className={styles.statValue}>{userProfile.statistics.totalDaysOff}</span><span className={styles.statUnit}> jours </span></div>
                </div>
                <div className={styles.statInfo}>
                    <div className={styles.statExplaination}>Nombre de sessions</div>
                    <div className={styles.stat}><span className={styles.statValue}>{userProfile.statistics.totalSessions}</span><span className={styles.statUnit}> sessions</span></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
