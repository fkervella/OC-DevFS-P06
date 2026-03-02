import useFetch from '../../utils/hooks'

function Profile() {

  const { data: userProfile, isLoading: isLoadingUserProfile, error: errorUserProfile } = useFetch(`http://localhost:8000/api/user-info`);
  if (errorUserProfile) {
    alert("Problème lors de la récupération des données user-info");
  }

  return (
    <div className="page">
      { isLoadingUserProfile ? (<div>Chargement en cours</div>)
      : ( 
      <>
      <div className="infos">
        <div className="memberInfos">
            <img src={userProfile.profile.profilePicture} alt="image du profil"/>
            <div>
                <div className="memberName">{userProfile.profile.firstName} {userProfile.profile.lastName}</div>
                <div className="memberSince">Membre depuis le {userProfile.profile.createdAt}</div>
            </div>
        </div>
        <div className="yourProfile">
            <div className="profileTitle">Votre profil</div>
            <div className="profileInfo">Age : {userProfile.profile.age}</div>
            <div className="profileInfo">Genre : {userProfile.profile.gender}</div>
            <div className="profileInfo">Taille : {userProfile.profile.height} cm</div>
            <div className="profileInfo">Poids: {userProfile.profile.weight} kg</div>
        </div>
        <div className="stats">
            <h4>Vos statistiques</h4>
            <div className="statsSubTitle">depuis le {userProfile.profile.createdAt}</div>
            <div className="statsValues">
                <div className="statInfo">
                    <div className="statExplaination">Temps total couru</div>
                    <div className="stat"><span className="statValue">{userProfile.statistics.totalDuration}h</span><span className="statUnit"> 0min</span></div>
                </div>
                <div className="statInfo">
                    <div className="statExplaination">Calories brulées</div>
                    <div className="stat"><span className="statValue">{userProfile.statistics.totalCalories}</span><span className="statUnit"> cal</span></div>
                </div>
                <div className="statInfo">
                    <div className="statExplaination">Distance totale parcourue</div>
                    <div className="stat"><span className="statValue">{userProfile.statistics.totalDistance}</span><span className="statUnit"> km</span></div>
                </div>
                <div className="statInfo">
                    <div className="statExplaination">Nombre de jours de repos</div>
                    <div className="stat"><span className="statValue">{userProfile.statistics.totalDaysOff}</span><span className="statUnit"> jours </span></div>
                </div>
                <div className="statInfo">
                    <div className="statExplaination">Nombre de sessions</div>
                    <div className="stat"><span className="statValue">{userProfile.statistics.totalSessions}</span><span className="statUnit"> sessions</span></div>
                </div>
            </div>
        </div>
      </div></>
       )}
    </div>
  )
}

export default Profile
