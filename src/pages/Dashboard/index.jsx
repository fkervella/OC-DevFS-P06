import styles from './Dashboard.module.css'

function Dashboard() {

  return (
    <div className={styles.page}>
      <div className={styles.abstract}>
        <img src="./assets/avatar.jpg" alt="image du profil"/>
        <div className={styles.memberInfo}>
            <h4>Clara Dupont</h4>
            <div className={styles.memberSince}>Membre depuis le 14 juin 2023</div>
        </div>
        <div className={styles.distanceInfo}>
            <div className={styles.distanceTitle}>Distance totale parcourue</div>
            <div className={styles.distanceArea}>
                <img src="./assets/OUTLINE.png" alt="image distance parcourue"/>
                <div className={styles.distance}>312 km</div>
            </div>
        </div>
      </div>
      <div className={styles.performances}>
        <h4>Vos dernières performances</h4>
        <div className={styles.graphArea}>
          <div className={styles.leftGraph}>
            <div className={styles.leftGraphTitle}>18 km en moyenne</div>
            <div className={styles.dateSelection}>Sélection de la période</div>
            <div className={styles.graphExplaination}>Totale des kilomètres des 4 dernières semaines</div>
            <div className={styles.graph}>Graphique</div>
          </div>
          <div className={styles.rightGraph}>
            <div className={styles.rightGraphTitle}>163 BPM</div>
            <div className={styles.dateSelection}>Sélection de la période</div>
            <div className={styles.graphExplaination}>Fréquence cardiaque moyenne</div>
            <div className={styles.graph}>Graphique</div>
          </div>
        </div>
      </div>
      <div>
        <h4>Cette semaine</h4>
        <div className={styles.subTitle}>Du 23/06/2025 au 30/06/2025</div>
        <div className={styles.graphArea}>
            <div className={styles.weekRuns}>
                <div className={styles.runResult}><span className={styles.runValue}>4X</span><span className={styles.runUnit}> sur l objectif de 6</span></div>
                <div className={styles.activityExplaination}>Courses hebdomadaires réalisées</div>
                <div>Graphique</div>
            </div>
            <div className={styles.activityTime}>
                <div className={styles.activityExplaination}>Durée de l activité</div>
                <div className={styles.timeResult}><span className={styles.timeValue}>140</span><span className={styles.timeUnit}> minutes</span></div>
            </div>
            <div className={styles.activityDistance}>
                <div className={styles.activityExplaination}>Distance</div>
                <div className={styles.distanceResult}><span className={styles.distanceValue}>21.7</span><span className={styles.distanceUnit}> kilomètres</span></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
