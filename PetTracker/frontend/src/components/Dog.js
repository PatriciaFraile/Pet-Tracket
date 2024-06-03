import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../index.css';

const Dog = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  
  const [form, setForm] = useState({
    tipo: 'dog',
    perroNombre: '',
    perroRaza: '',
    perroEdad: '',
    perroTamaño: '',
    perroSexo: '',
    perroVacunas: ''
  });
  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert('No se encontró ningún usuario. Por favor, cree un usuario.');
      navigate('/create-user'); // Redirige al usuario a una página para crear un nuevo usuario
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const translate = (funcName) => {
    return {
      type: funcName.tipo,
      name: funcName.perroNombre,
      breed: funcName.perroRaza,
      year: funcName.perroEdad,
      weight: funcName.perroTamaño,
      sex: funcName.perroSexo,
      vaccine: funcName.perroVacunas,
    }
  };

  const validateForm = () => {
    const { perroNombre, perroRaza, perroEdad, perroTamaño, perroSexo, perroVacunas } = form;
    if (!perroNombre || !perroRaza || !perroEdad || !perroTamaño || !perroSexo || !perroVacunas) {
      alert('Por favor, rellene todos los campos.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.put(`https://3v3zpv2z-8080.uks1.devtunnels.ms/${userId}/add_mascot`, translate(form), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        console.log('Datos enviados correctamente');
        // guarda los fatos del form    
        
        const storedDogs = JSON.parse(localStorage.getItem('dogs')) || [];
        storedDogs.push(form);
        localStorage.setItem('dogs', JSON.stringify(storedDogs));

        console.log(storedDogs);

        const addAnother = window.confirm('¿Desea añadir otra mascota?');
        if (addAnother) { 
          navigate('/options');
        } else {
          navigate('/home');
        }
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <main style={{ background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`, width: '100%', height: '910px', objectFit: 'cover', padding: '26px' }}>
      <div className="containerDog">
        <h1 style={{ fontSize: '2.5rem' }} className="title">Formulario de Información sobre tu Perro</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Nombre del Perro:</label>
            <input className="input" type="text" name="perroNombre" value={form.perroNombre} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="label">Raza del Perro:</label>
            <select className="input" name="perroRaza" value={form.perroRaza} onChange={handleChange}>
              <option value="">Selecciona una raza</option>
              <option value="Labrador Retriever">Labrador Retriever</option>
              <option value="Pastor Alemán">Pastor Alemán</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="Bulldog Francés">Bulldog Francés</option>
              <option value="Bulldog Inglés">Bulldog Inglés</option>
              <option value="Caniche">Caniche</option>
              <option value="Beagle">Beagle</option>
              <option value="Rottweiler">Rottweiler</option>
              <option value="Pointer">Pointer</option>
              <option value="Corgi">Corgi</option>
              <option value="Dachshund">Dachshund</option>
              <option value="Yorkshire">Yorkshire</option>
              <option value="Husky">Husky</option>
              <option value="Poodle">Poodle</option>
              <option value="Chihuahua">Chihuahua</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Edad del Perro:</label>
            <select className="input" name="perroEdad" value={form.perroEdad} onChange={handleChange}>
              <option value="">Selecciona una edad</option>
              <option value="Cachorro">Cachorro (menos de 1 año)</option>
              <option value="Joven">Joven (1 - 3 años)</option>
              <option value="Adulto">Adulto (3 - 7 años)</option>
              <option value="Senior">Senior (más de 7 años)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Tamaño del Perro:</label>
            <select className="input" name="perroTamaño" value={form.perroTamaño} onChange={handleChange}>
              <option value="">Selecciona un tamaño</option>
              <option value="Pequeño">Pequeño (menos de 10 kg)</option>
              <option value="Mediano">Mediano (10 - 25 kg)</option>
              <option value="Grande">Grande (25 - 40 kg)</option>
              <option value="Muy Grande">Muy Grande (más de 40 kg)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Sexo del Perro:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input className="radio-input" type="radio" name="perroSexo" value="Macho" checked={form.perroSexo === 'Macho'} onChange={handleChange} />
                Macho
              </label>
              <label className="radio-label">
                <input className="radio-input" type="radio" name="perroSexo" value="Hembra" checked={form.perroSexo === 'Hembra'} onChange={handleChange} />
                Hembra
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Última Vacuna:</label>
            <select className="input" name="perroVacunas" value={form.perroVacunas} onChange={handleChange}>
              <option value="">Selecciona una vacuna</option>
              <option value="Ninguna">Ninguna</option>
              <option value="Moquillo">Moquillo</option>
              <option value="Parvovirosis">Parvovirosis</option>
              <option value="Hepatitis vírica canina">Hepatitis vírica canina</option>
              <option value="Rabia">Rabia</option>
            </select>
          </div>

          <button className="button" type="submit">Enviar</button>
        </form>
      </div>
    </main>
  );
};

export default Dog;
