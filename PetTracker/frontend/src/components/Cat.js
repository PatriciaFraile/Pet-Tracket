import React, { useState } from 'react';
import '../index.css'; 

const Cat = () => {
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
    console.log(form);
    // Aquí puedes enviar los datos del formulario a tu servidor o API
  };


  return (
    <main style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 160, 180, 1)), url(https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D)`, width:'100%', height:'100%',objectFit:'cover',padding:'26px'}}>    
        <div className="containerCat">
        <h1 className="title">Formulario de Información sobre tu gato</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Nombre del Gato:</label>
            <input className="input" type="text" name="gatoNombre" value={form.gatoNombre} onChange={handleChange} />
          </div>

            <div className="form-group">
            <label className="label">Raza del Gato:</label>
            <select className="input" name="gatoRaza" value={form.gatoRaza} onChange={handleChange}>
                <option value="">Selecciona una raza</option>
                <option value="Labrador Retriever">Labrador Retriever</option>
                <option value="Pastor Alemán">Pastor Alemán</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Beagle">Beagle</option>
                <option value="Poodle">Poodle</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Otro">Otro</option>
            </select>
            </div>

            <div className="form-group">
            <label className="label">Edad del Gato:</label>
            <select className="input" name="gatoEdad" value={form.gatoEdad} onChange={handleChange}>
                <option value="">Selecciona una edad</option>
                <option value="Cachorro">Cachorro (menos de 1 año)</option>
                <option value="Joven">Joven (1-3 años)</option>
                <option value="Adulto">Adulto (3-7 años)</option>
                <option value="Senior">Senior (más de 7 años)</option>
            </select>
            </div>

            <div className="form-group">
            <label className="label">Tamaño del Gato:</label>
            <select className="input" name="gatoTamaño" value={form.gatoTamaño} onChange={handleChange}>
                <option value="">Selecciona un tamaño</option>
                <option value="Pequeño">Pequeño (menos de 10 kg)</option>
                <option value="Mediano">Mediano (10-25 kg)</option>
                <option value="Grande">Grande (25-40 kg)</option>
                <option value="Muy Grande">Muy Grande (más de 40 kg)</option>
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

export default Cat;
