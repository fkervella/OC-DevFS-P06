import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, subWeeks, addWeeks, startOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

const OneWeekNavigator = ({startDate: initialStartDate, endDate: initialEndDate, onDateRangeChange}) => {

  // État pour stocker la date actuelle (par défaut, aujourd'hui)
  const [currentStartDate, setCurrentStartDate] = useState(
    initialStartDate ? startOfWeek(new Date(initialStartDate), { weekStartsOn: 1 }) : startOfWeek(startOfMonth(new Date()), { weekStartsOn: 1 })
  );

  // Mettre à jour currentDate si les props initialStartDate ou initialEndDate changent
  useEffect(() => {
    if (initialStartDate) {
      setCurrentStartDate(startOfWeek(new Date(initialStartDate), { weekStartsOn: 1 }));
    }
  }, [initialStartDate]);

  // Fonction pour obtenir le lundi de la semaine actuelle
  const getMonday = (date) => startOfWeek(date, { weekStartsOn: 1 }); // 1 = lundi

  // Fonction pour obtenir le dimanche de la semaine actuelle
  const getSunday = (date) => endOfWeek(date, { weekStartsOn: 1 });

  // Fonction pour aller à la semaine précédente
  const goToPreviousWeek = () => {
    const newStartDate = subWeeks(currentStartDate, 1);
    setCurrentStartDate(newStartDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: getMonday(newStartDate),
        endDate: getSunday(newStartDate),
      });
    }
  };

  // Fonction pour aller à la semaine suivante
  const goToNextWeek = () => {
    const newStartDate = addWeeks(currentStartDate, 1);
    setCurrentStartDate(newStartDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: getMonday(newStartDate),
        endDate: getSunday(newStartDate),
      });
    }
  };

  // Formater les dates en français (ex: "1er janvier - 7 janvier")
  const formatDateRange = (start, end) => {
    const startFormatted = format(start, "d MMMM", { locale: fr });
    const endFormatted = format(end, "d MMMM yyyy", { locale: fr });
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button class="buttonSelect" onClick={goToPreviousWeek}>&lt;</button>
      <div>
        <span>{formatDateRange(getMonday(currentStartDate), getSunday(currentStartDate))}</span>
      </div>
      <button class="buttonSelect" onClick={goToNextWeek}>&gt;</button>
    </div>
  );
};

export default OneWeekNavigator;


