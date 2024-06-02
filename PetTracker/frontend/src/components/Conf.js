import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserSettings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios.post(`https://khmc02q3-8080.uks1.devtunnels.ms/user/${userId}`)
        .then(response => {
          setUsername(response.data.username);
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    const cerrar = window.confirm('¿Estás seguro de cerrar sesión?');
    if (cerrar) {
      navigate('/');
    }
  };

  // const handleChangeUsername = async () => {
  //   try {
  //     const response = await axios.put(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}`, {
  //       username: username,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     if (response.status === 200) {
  //       console.log('Nombre de usuario cambiado correctamente');
  //     } else {
  //       console.error('Error al cambiar el nombre de usuario');
  //     }
  //   } catch (error) {
  //     console.error('Error de red:', error);
  //   }
  // };

  // const handleChangePassword = async () => {
  //   try {
  //     const response = await axios.put(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}`, {
  //       password: newPassword,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     if (response.status === 200) {
  //       console.log('Contraseña cambiada correctamente');
  //     } else {
  //       console.error('Error al cambiar la contraseña');
  //     }
  //   } catch (error) {
  //     console.error('Error de red:', error);
  //   }
  // };

  return (
   <main style={{background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`, width: '100%', height: '910px', objectFit: 'cover', padding: '26px' }}>
    <div style={styles.container} className='user-settings'>
      <h2 style={styles.header}>Configuración de Usuario</h2>

      <div style={styles.infoContainer}>
        <label style={styles.label}>Nombre de Usuario: {username}</label>
        <button style={styles.button} onClick={'handleChangeUsername'}>
          Cambiar nombre de Usuario
        </button>
      </div>

      <div style={styles.infoContainer}>
        <label style={styles.label}>Contraseña: ********</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
          style={styles.input}
        />
        <button style={styles.button} onClick={'handleChangePassword'}>
          Cambiar Contraseña
        </button>
      </div>

      <button style={styles.logoutButton} onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
    </main>
  
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    with: '90%',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(10,10,10,0.5)',
    borderRadius: '40px'
    
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  infoContainer: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#00A0B4',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  logoutButton: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'red',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default UserSettings;
