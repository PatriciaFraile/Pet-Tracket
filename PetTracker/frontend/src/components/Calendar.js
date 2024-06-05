import React, { useState } from 'react';
import VaccinationForm from './VaccinationForm';
import VaccinationCalendar from '../models/VaccinationCalendar';
import '../css/Calendar.css';

const Calendar = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);

  const addVaccination = (vaccination) => {
    setVaccinations([...vaccinations, vaccination]);
    setShowForm(false); 
  };

  const handleDayClick = (date) => {
    const clickedDate = date.toDateString();
    const vaccination = vaccinations.find(v => new Date(v.date).toDateString() === clickedDate);
    setSelectedVaccination(vaccination || { date, name: 'No hay vacunas programadas para este día.' });
  };

  return (
    <div className="calendar" style={{ background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1))`, minHeight: '100vh', padding: '50px', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '3rem', color: 'white' }}>Calendario de Vacunación para Mascotas</h1>
      <div className="button-calendar">
        <button style={{
          width: '400px',
          height: '50px'
        }}
         onClick={() => setShowForm(!showForm)}>
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
          <p>Vacuna : {selectedVaccination.name}</p>
          <p>Mascota: {selectedVaccination.pet}</p>
          <p>Hora: {selectedVaccination.hour}</p>
          {selectedVaccination.date && typeof selectedVaccination.date === 'object' && typeof selectedVaccination.date.toLocaleDateString === 'function' && (
            <p>Fecha: {new Date(selectedVaccination.date).toLocaleDateString()}</p>
          )}
          <button id='button-calendario' onClick={() => setSelectedVaccination(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
