import styles from './Dashboard.module.css'
import userProfile from '../../../data/user-info.js'
import SimplePieChart from '../../components/PieChart'
import SimpleBarChart from '../../components/SimpleBarChart'
import DataComposedChart from '../../components/DataComposedChart'
import WeekNavigator from '../../components/WeekNavigator'
import { userData } from '../../../data/user-activity'
import { useState } from 'react'
import { startOfWeek, endOfWeek, addWeeks, } from 'date-fns';

function Dashboard() {

  const [dateRange, setDateRange] = useState({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }), // Premier lundi de la semaine actuelle
    endDate: endOfWeek(addWeeks(new Date(), 3), { weekStartsOn: 1 }), // Dernier dimanche 4 semaines plus tard
  });

  return (
    <div className={styles.page}>
      <div className={styles.abstract}>
        <img src={userProfile.profile.profilePicture} alt="image du profil"/>
        <div className={styles.memberInfo}>
            <h4>{userProfile.profile.firstName} {userProfile.profile.lastName}</h4>
            <div className={styles.memberSince}>Membre depuis le {userProfile.profile.createdAt}</div>
        </div>
        <div className={styles.distanceInfo}>
            <div className={styles.distanceTitle}>Distance totale parcourue</div>
            <div className={styles.distanceArea}>
                <img src="./assets/OUTLINE.png" alt="image distance parcourue"/>
                <div className={styles.distance}>{userProfile.statistics.totalDistance} km</div>
            </div>
        </div>
      </div>
      <div className={styles.performances}>
        <h4>Vos dernières performances</h4>
        <div className={styles.graphArea}>
          <div className={styles.leftGraph}>
            <div className={styles.leftGraphTitle}>18 km en moyenne</div>
            <WeekNavigator startDate={dateRange.startDate} endDate={dateRange.endDate} onDateRangeChange={setDateRange}/>
            <div className={styles.graphExplaination}>Total des kilomètres des 4 dernières semaines</div>
            <SimpleBarChart activityData={ userData } startDate={dateRange.startDate} endDate={dateRange.endDate} />
          </div>
          <div className={styles.rightGraph}>
            <div className={styles.rightGraphTitle}>163 BPM</div>
            <WeekNavigator />
            <div className={styles.graphExplaination}>Fréquence cardiaque moyenne</div>
            <DataComposedChart />
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
                <SimplePieChart />
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
