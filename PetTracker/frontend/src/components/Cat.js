'use client'

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import '../index.css'; 

const Cat = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // enviar los datos del formulario a tu bbdd
    const {gatoNombre, gatoRaza, gatoEdad, gatoTamaño, gatoSexo, gatoVacunaConf, gatoVacunas } = form;
    if (
      !gatoNombre ||
      !gatoRaza ||
      !gatoEdad ||
      !gatoTamaño ||
      !gatoSexo ||
      !gatoVacunaConf ||
      !gatoVacunas 
    ) {
      window.alert('Por favor rellene todos los cmapos.')
    } else{
      console.log(form);
      navigate('/home')
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
            <label className="label">¿Esta vacunado?</label>
            <div className="radio-group">
                <label className="radio-label">
                <input className="radio-input" type="radio" name="gatoVacunaConf" value="Si" checked={form.gatoVacunaConf === 'Si'} onChange={handleChange} />
                Si
                </label>
                <label className="radio-label">
                <input className="radio-input" type="radio" name="gatoVacunaConf" value="No" checked={form.gatoVacunaConf === 'No'} onChange={handleChange} />
                No
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
