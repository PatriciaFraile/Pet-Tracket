import React, { useState } from 'react';

// Componente de configuración de usuario
const UserSettings = () => {
  // Estados para los campos del usuario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí podrías implementar la lógica para cerrar sesión
    console.log('Sesión cerrada');
  };

  // Función para cambiar contraseña
  const handleChangePassword = () => {
    // Aquí podrías implementar la lógica para cambiar la contraseña
    console.log('Cambiando contraseña');
  };

  return (
    <div className=' '> 
      <h2>Configuración de Usuario</h2>
        <div>
        <button style={{
            width: '50%',
            height:'50%',
            padding: '10px',
            background: '007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition:'background 0.3s ease'
        }}>Cambiar nombre de Usuario</button>
        </div>
      
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>

  );
};

export default UserSettings;
