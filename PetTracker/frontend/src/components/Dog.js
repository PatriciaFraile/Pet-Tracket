import React, { useState } from 'react';

const Dog = () => {
  const [form, setForm] = useState({
    perroNombre: '',
    perroRaza: '',
    perroEdad: '',
    perroTamaño: '',
    perroSexo: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({
        ...form,
        actividades: checked
          ? [...form.actividades, value]
          : form.actividades.filter((actividad) => actividad !== value)
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Aquí puedes enviar los datos del formulario a tu servidor o API
  };

  return (
    <div>
      <h1>Formulario de Información sobre tu Perro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Perro:</label>
          <input type="text" name="perroNombre" value={form.perroNombre} onChange={handleChange} />
        </div>

        <div>
          <label>Raza del Perro:</label>
          <select name="perroRaza" value={form.perroRaza} onChange={handleChange}>
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

        <div>
          <label>Edad del Perro:</label>
          <select name="perroEdad" value={form.perroEdad} onChange={handleChange}>
            <option value="">Selecciona una edad</option>
            <option value="Cachorro">Cachorro (menos de 1 año)</option>
            <option value="Joven">Joven (1-3 años)</option>
            <option value="Adulto">Adulto (3-7 años)</option>
            <option value="Senior">Senior (más de 7 años)</option>
          </select>
        </div>

        <div>
          <label>Tamaño del Perro:</label>
          <select name="perroTamaño" value={form.perroTamaño} onChange={handleChange}>
            <option value="">Selecciona un tamaño</option>
            <option value="Pequeño">Pequeño (menos de 10 kg)</option>
            <option value="Mediano">Mediano (10-25 kg)</option>
            <option value="Grande">Grande (25-40 kg)</option>
            <option value="Muy Grande">Muy Grande (más de 40 kg)</option>
          </select>
        </div>

        <div>
          <label>Sexo del Perro:</label>
          <label>
            <input type="radio" name="perroSexo" value="Macho" checked={form.perroSexo === 'Macho'} onChange={handleChange} />
            Macho
          </label>
          <label>
            <input type="radio" name="perroSexo" value="Hembra" checked={form.perroSexo === 'Hembra'} onChange={handleChange} />
            Hembra
          </label>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Dog;
