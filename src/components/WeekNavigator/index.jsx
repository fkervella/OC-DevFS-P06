import React, { useState } from 'react';
import { format, addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale'; // Pour le format français (optionnel)

const WeekNavigator = () => {
  // État pour stocker la date actuelle (par défaut, aujourd'hui)
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fonction pour obtenir le lundi de la semaine actuelle
  const getMonday = (date) => startOfWeek(date, { weekStartsOn: 1 }); // 1 = lundi

  // Fonction pour obtenir le dimanche de la semaine actuelle
  const getSunday = (date) => endOfWeek(date, { weekStartsOn: 1 });

  // Fonction pour aller à la semaine précédente
  const goToPreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  // Fonction pour aller à la semaine suivante
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  // Formater les dates en français (ex: "lundi 1er janvier 2024")
  const formatDate = (date) => format(date, "d MMMM", { locale: fr });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button onClick={goToPreviousWeek}>&lt;</button>
      <div>
        <span>{formatDate(getMonday(currentDate))} - {formatDate(getSunday(currentDate))}</span>
      </div>
      <button onClick={goToNextWeek}>&gt;</button>
    </div>
  );
};

export default WeekNavigator;
