import React, { useState } from 'react';

const VaccinationForm = ({ addVaccination }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVaccination({ name, date });
    setName('');
    setDate('');
  };

  return (
    <form className='formCalendar' onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la vacuna:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Agregar Vacuna</button>
    </form>
  );
};

export default VaccinationForm;

