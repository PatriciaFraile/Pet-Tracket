import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VaccinationForm = ({ addVaccination }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [userId, setUserId] = useState('');
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVaccination({ name, date, hour, pet: selectedPet });
    setName('');
    setDate('');
    setHour('');
    setSelectedPet('');
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascots`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [userId]);

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
        <label>Mascota</label>
        <select 
          className="input" 
          name="pet" 
          value={selectedPet}
          onChange={(e) => setSelectedPet(e.target.value)}
          required
        >
          <option value="">Selecciona una mascota</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.name}>{pet.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Hora:</label>
        <input 
          type="time" 
          value={hour} 
          onChange={(e) => setHour(e.target.value)} 
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

