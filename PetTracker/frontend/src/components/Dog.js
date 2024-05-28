import React, { useState } from 'react';
import '../index.css'; 

const Dog = () => {
  const [form, setForm] = useState({
    perroNombre: '',
    perroRaza: '',
    perroEdad: '',
    perroTamaño: '',
    perroSexo: '',
    perroVacunaConf:'',
    perroVacunas:''
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
    // enviar los datos del formulario a tu bbdd
  };

  return (
    <main style={{background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`,width:'100%', height:'910px',objectFit:'cover',padding:'26px'}}>    
        <div className="containerDog">
        <h1 style={{fontSize: '2.5rem'}} className="title">Formulario de Información sobre tu Perro</h1>
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
                <option value="Bulldog">Bulldog</option>
                <option value="Beagle">Beagle</option>
                <option value="Poodle">Poodle</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Otro">Otro</option>
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
            <label className="label">¿Esta vacunado?</label>
            <div className="radio-group">
                <label className="radio-label">
                <input className="radio-input" type="radio" name="perroVacunaConf" value="Si" checked={form.perroVacunaConf === 'Si'} onChange={handleChange} />
                Si
                </label>
                <label className="radio-label">
                <input className="radio-input" type="radio" name="perroVacunaConf" value="No" checked={form.perroVacunaConf === 'No'} onChange={handleChange} />
                No
                </label>
            </div>
            </div>
            
            <div className="form-group">
            <label className="label">Ultima Vacuna</label>
            <select className="input" name="perroVacunas" value={form.perroVacunas} onChange={handleChange}>
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

export default Dog;
