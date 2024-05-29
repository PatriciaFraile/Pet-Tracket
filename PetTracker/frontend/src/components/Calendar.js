import React, { useState } from 'react';
import VaccinationForm from './VaccinationForm';
import VaccinationCalendar from '../models/VaccinationCalendar';
import '../css/CalendarTwo.css'

const Calendar = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);

  const addVaccination = (vaccination) => {
    setVaccinations([...vaccinations, vaccination]);
    setShowForm(false); // Cerrar el formulario después de añadir una vacuna
  };

  const handleDayClick = (date) => {
    const vaccination = vaccinations.find(v => new Date(v.date).toDateString() === date.toDateString());
    setSelectedVaccination(vaccination || { date, name: 'No hay vacunas programadas para este día.' });
  };

  return (
    <div className="App">
      <h1>Calendario de Vacunación para Mascotas</h1>
      <div className="button-container">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>
      </div>
      <div className="calendar-container">
        <VaccinationCalendar vaccinations={vaccinations} onDayClick={handleDayClick} />
      </div>
      <div className={`form-container ${showForm ? 'open' : ''}`}>
        <VaccinationForm addVaccination={addVaccination} />
      </div>
      {selectedVaccination && (
        <div className="vaccination-info">
          <h2>Información de Vacunación</h2>
          <p>{selectedVaccination.name}</p>
          {selectedVaccination.date && <p>Fecha: {selectedVaccination.date}</p>}
          <button onClick={() => setSelectedVaccination(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
