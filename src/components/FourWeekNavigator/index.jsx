import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, subWeeks, addWeeks, startOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

const FourWeekNavigator = ({startDate: initialStartDate, endDate: initialEndDate, onDateRangeChange}) => {

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

  // Fonction pour obtenir les 4 semaines (1 mois) à partir de currentStartDate
  const getFourWeeks = (startDate = currentStartDate) => {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = addWeeks(startDate, i);
      weeks.push({
        startDate: getMonday(weekStart),
        endDate: getSunday(weekStart),
      });
    }
    return weeks;
  };

  // Fonction pour aller à la semaine précédente
  const goToPreviousWeek = () => {
    const newStartDate = subWeeks(currentStartDate, 1);
    setCurrentStartDate(newStartDate);
    const weeks = getFourWeeks(newStartDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: weeks[0].startDate,
        endDate: weeks[3].endDate,
      });
    }
  };

  // Fonction pour aller à la semaine suivante
  const goToNextWeek = () => {
    const newStartDate = addWeeks(currentStartDate, 1);
    setCurrentStartDate(newStartDate);
    const weeks = getFourWeeks(newStartDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: weeks[0].startDate,
        endDate: weeks[3].endDate,
      });
    }
  };

  // Formater les dates en français (ex: "1er janvier - 7 janvier")
  const formatDateRange = (start, end) => {
    const startFormatted = format(start, "d MMMM", { locale: fr });
    const endFormatted = format(end, "d MMMM yyyy", { locale: fr });
    return `${startFormatted} - ${endFormatted}`;
  };

  // Obtenir les 4 semaines actuelles
  const weeks = getFourWeeks();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button class="buttonSelect" onClick={goToPreviousWeek}>&lt;</button>
      <div>
        <span>{formatDateRange(weeks[0].startDate, weeks[3].endDate)}</span>
      </div>
      <button class="buttonSelect" onClick={goToNextWeek}>&gt;</button>
    </div>
  );
};

export default FourWeekNavigator;
