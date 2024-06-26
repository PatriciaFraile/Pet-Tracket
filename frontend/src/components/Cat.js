'use client'

import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import '../index.css'; 

const Cat = () => {

  const navigate = useNavigate()
  const [userId, setUserId] = useState(''); 

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const [form, setForm] = useState({
    tipo: 'cat',
    gatoNombre: '',
    gatoRaza: '',
    gatoEdad: '',
    gatoTamaño: '',
    gatoSexo: '',
    gatoVacunaConf: '',
    gatoVacunas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const translate = (funcName) => {
    return {
      type:funcName.tipo,
      name:funcName.gatoNombre,
      breed: funcName.gatoRaza,
      year:funcName.gatoEdad,
      weight:funcName.gatoTamaño,
      sex:funcName.gatoTamaño,
      vaccine:funcName.gatoVacunas,
    }
  };

  const validateForm = () => {
    const { gatoNombre, gatoRaza, gatoEdad, gatoTamaño, gatoSexo, gatoVacunas } = form;
    if (!gatoNombre || !gatoRaza || !gatoEdad || !gatoTamaño || !gatoSexo || !gatoVacunas) {
      alert('Por favor, rellene todos los campos.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.put(`http://localhost:8080/${userId}/add_mascot`, translate(form), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        console.log('Datos enviados correctamente');
        const storedCats = JSON.parse(localStorage.getItem('cats')) || []
        storedCats.push(form)
        localStorage.setItem('cats', JSON.stringify(storedCats));

        const addAnother = window.confirm('¿Desea añadir otra mascota?');
        if (addAnother) { 
          navigate('/options')
        } else {
          navigate("/home");
        }
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };




  return (
    <main style={{background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`,width:'100%', height:'910px',objectFit:'cover',padding:'26px'}}>    
        <div className="containerCat">
        <h1 className="title" style={{fontSize: '2.5rem'}}>Formulario de Información sobre tu gato</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Nombre del Gato:</label>
            <input className="input" type="text" name="gatoNombre" value={form.gatoNombre} onChange={handleChange} />
          </div>

            <div className="form-group">
            <label className="label">Raza del Gato:</label>
            <select className="input" name="gatoRaza" value={form.gatoRaza} onChange={handleChange}>
                <option value="">Selecciona una raza</option>
                <option value="Persa">Persa</option>
                <option value="Siamés">Siamés</option>
                <option value="Maine Coon">Maine Coon</option>
                <option value="Ragdoll">Ragdoll</option>
                <option value="Bengalí">Bengalí</option>
                <option value="Esfinge (Sphynx)">Esfinge (Sphynx)</option>
                <option value="Abisinio">Abisinio</option>
                <option value="Ruso Azul">Ruso Azul</option>
                <option value="Scottish Fold">Scottish Fold</option>
                <option value="Birmano">Birmano</option>
                <option value="Oriental de pelo corto">Oriental de pelo corto</option>
                <option value="Devon Rex">Devon Rex</option>
                <option value="Cornish Rex">Cornish Rex</option>
                <option value="Noruego del Bosque">Noruego del Bosque</option>
                <option value="Angora Turco">Angora Turco</option>
                <option value="Somali">Somali</option>
                <option value="Chartreux">Chartreux</option>
                <option value="Manx">Manx</option>
                <option value="Balinés">Balinés</option>
            </select>
            </div>

            <div className="form-group">
            <label className="label">Edad del Gato:</label>
            <select className="input" name="gatoEdad" value={form.gatoEdad} onChange={handleChange}>
                <option value="">Selecciona una edad</option>
                <option value="Cachorro">Cachorro (menos de 7 meses)</option>
                <option value="Joven">Joven (7 meses - 2 años)</option>
                <option value="Maduro">Maduro (3 - 6 años)</option>
                <option value="Adulto">Adulto (7 - 10 años)</option>
                <option value="Mayor">Mayor (11 - 14 años)</option>
                <option value="Anciano">Anciano (más de 15 años)</option>
            </select>
            </div>

            <div className="form-group">
            <label className="label">Tamaño del Gato:</label>
            <select className="input" name="gatoTamaño" value={form.gatoTamaño} onChange={handleChange}>
                <option value="">Selecciona un tamaño</option>
                <option value="Pequeño">Pequeño (menos de 3 kg)</option>
                <option value="Mediano">Mediano (3 - 6 kg)</option>
                <option value="Grande">Grande (6 - 9 kg)</option>
                <option value="Muy Grande">Muy Grande (9 - 11 kg)</option>
            </select>
            </div>

            <div className="form-group">
            <label className="label">Sexo del Gato:</label>
            <div className="radio-group">
                <label className="radio-label">
                <input className="radio-input" type="radio" name="gatoSexo" value="Macho" checked={form.gatoSexo === 'Macho'} onChange={handleChange} />
                Macho
                </label>
                <label className="radio-label">
                <input className="radio-input" type="radio" name="gatoSexo" value="Hembra" checked={form.gatoSexo === 'Hembra'} onChange={handleChange} />
                Hembra
                </label>
            </div>
            </div>
            
            <div className="form-group">
            <label className="label">Ultima Vacuna </label>
            <select className="input" name="gatoVacunas" value={form.gatoVacunas} onChange={handleChange}>
                <option value="">Selecciona una vacuna</option>
                <option value="Ninguna">Ninguna</option>
                <option value="Trivalente felina">Vacuna trivalente felina</option>
                <option value="Leucemia felina:">Leucemia felina:</option>
                <option value="Rabia">Rabia</option>
            </select>
            </div>

            <button className="button" type="submit">Enviar</button>
        </form>
        </div>
    </main>
  );
};

export default Cat;
