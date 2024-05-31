import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/Calendar.css';

const VaccinationCalendar = ({ vaccinations, onDayClick }) => {
  const vaccinationDates = vaccinations.map(vaccination => new Date(vaccination.date));

  const tileContent = ({ date, view }) => {
    if (view === 'month' && vaccinationDates.some(vd => vd.toDateString() === date.toDateString())) {
      return <p className="highlight">Vacuna</p>;
    }
  };

  return (
    <div className="full-screen-calendar">
      <Calendar
        tileContent={tileContent}
        onClickDay={onDayClick}
      />
    </div>
  );
};

export default VaccinationCalendar;




