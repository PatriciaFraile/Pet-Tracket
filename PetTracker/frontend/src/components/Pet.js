import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Pet = () => {
  const [userId, setUserId] = useState('');
  const [pets, setPets] = useState([]);
  const navigate = useNavigate()
  const {id} = useParams()

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

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascot/${id}`);
        setPets([response.data]);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, [userId,id]);

  console.log(id);

  if (!pets || pets.length === 0) {
    return <div>nO ENCONTRADAS</div>
  }

const handleChangePetName = async () => {
    try {
      const response = await axios.put(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascots`, {
        petName: pets.name,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        console.log('Nombre de usuario cambiado correctamente');
      } else {
        console.error('Error al cambiar el nombre de usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const botonVolver = () => {
    navigate('/home')
  }
  

  return (
    <main style={{background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`, width: '100%', height: '910px', objectFit: 'cover', padding: '26px' }}>
    <div style={styles.container} className='user-settings'>
      <h2 style={styles.header}>Configuración de Mascotas</h2>

      {pets.map((pet, index) => (
        <div key={index}>
          <div style={styles.infoContainer}>
            <label style={styles.label}>Nombre de la mascota: {pet.name}</label>
            <button style={styles.button} onClick={() => handleChangePetName(pet.id, 'name')}>
              Cambiar nombre de la Mascota
            </button>
          </div>

          <div style={styles.infoContainer}>
            <label style={styles.label}>Peso de la mascota: {pet.weight}</label>
            <button style={styles.button} onClick={() => handleChangePetName(pet.id, 'weight')}>
              Cambiar peso de la Mascota
            </button>
          </div>

          <div style={styles.infoContainer}>
            <label style={styles.label}>Edad de la mascota: {pet.year}</label>
            <button style={styles.button} onClick={() => handleChangePetName(pet.id, 'age')}>
              Cambiar edad de la Mascota
            </button>
          </div>

          <div style={styles.infoContainer}>
            <label style={styles.label}>Ultima vacuna: {pet.vaccine}</label>
            <button style={styles.button} onClick={() => handleChangePetName(pet.id, 'lastVaccine')}>
              Cambiar ultima vacuna
            </button>
          </div>
        </div>
      ))}

      <button onClick={botonVolver} style={styles.logoutButton} >
        Volver
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
      width: '100px',
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

export default Pet;
