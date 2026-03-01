import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, subDays, addDays, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale'; // Pour le format français (optionnel)

const WeekNavigator = ({startDate: initialStartDate, endDate: initialEndDate, onDateRangeChange}) => {

  // État pour stocker la date actuelle (par défaut, aujourd'hui)
  const [currentDate, setCurrentDate] = useState(
    initialStartDate ? startOfWeek(new Date(initialStartDate), { weekStartsOn: 1 }) : startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // Mettre à jour currentDate si les props initialStartDate ou initialEndDate changent
  useEffect(() => {
    if (initialStartDate) {
      setCurrentDate(startOfWeek(new Date(initialStartDate), { weekStartsOn: 1 }));
    }
  }, [initialStartDate]);

  // Fonction pour obtenir le lundi de la semaine actuelle
  const getMonday = (date) => startOfWeek(date, { weekStartsOn: 1 }); // 1 = lundi

  // Fonction pour obtenir le dimanche de la semaine actuelle
  const getSunday = (date) => endOfWeek(date, { weekStartsOn: 1 });

  // Fonction pour aller à la semaine précédente
  const goToPreviousWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: getMonday(newDate),
        endDate: getSunday(newDate),
      });
    }
  };

  // Fonction pour aller à la semaine suivante
  const goToNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: getMonday(newDate),
        endDate: getSunday(newDate),
      });
    }
  };

  // Formater les dates en français (ex: "lundi 1er janvier 2024")
  const formatDate = (date) => format(date, "d MMMM yyyy", { locale: fr });

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