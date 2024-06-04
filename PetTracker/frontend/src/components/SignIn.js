import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from './imgs/perroFondo.jpeg';

const SignIn = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const eventHandle = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value
    }));
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      if (!userId) return; // No hacer nada si no hay userId
      try {
        const response = await axios.get(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascots`);
        setPets(response.data);
        if (response.data.length > 0) {
          navigate("/home");
        } else {
          navigate("/options");
        }
      } catch (error) {
        navigate("/options");
        console.error("Error fetching pets:", error);
      }
    };

    if (login) {
      fetchPets();
    }
  }, [userId, login, navigate]);

  const loginUser = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    try {
      const response = await axios.post('https://3v3zpv2z-8080.uks1.devtunnels.ms/login', user);

      if (response.data.id) {
        localStorage.setItem('userId', response.data.id);
        setUserId(response.data.id);
        setLogin(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Entrando",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Algo ha ido mal!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div style={{ 
      display: "flex",
      height: "100vh"
    }}>
      <div style={{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="wrapper">
          <h2>Inicio de sesión</h2>
          <div className="form-wrapper sign-in">
            <form onSubmit={loginUser}>
              <div className="input-group">
                <input type="text" id="username" required onKeyUp={eventHandle} />
                <label htmlFor="username">Usuario</label>
              </div>
              <div className="input-group">
                <input type="password" id="password" required onKeyUp={eventHandle} />
                <label htmlFor="password">Contraseña</label>
              </div>
              <button type="submit">Iniciar sesión</button>
              <div className="signUp-link">
                <p>¿No tienes una cuenta?</p>
                <p><a href="register" className="signUpBtn-link"><b>Regístrate aquí</b></a></p>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <FontAwesomeIcon icon={faArrowLeft} size="2x" style={{ cursor: "pointer" }} onClick={goBack} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{
        flex: 1,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 160, 180, 1)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />
    </div>
  );
};

export default SignIn;
