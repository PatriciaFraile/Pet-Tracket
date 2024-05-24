import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import backgroundImage from './imgs/perroFondo.jpeg';

const SignIn = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false)
  const navigate = useNavigate()

  const eventHandle = (e) => {
    setUser((e1) => ({
        ...e1,
        [e.target.id]: e.target.value
    }));
  };

  if (login) {
    return navigate("/home")
  }

  const loginUser = async () => {
    try {
        const response = await axios.post('login', user);
        console.log(response.data);

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario añadido",
            showConfirmButton: false,
            timer: 2000
        });
        setLogin(true)
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
            <form action="">
              <div className="input-group">
                <input type="text" id="username" required onKeyUp={eventHandle}/>
                <label htmlFor="username">Usuario</label>
              </div>
              <div className="input-group">
                <input type="password" id="password" required onKeyUp={eventHandle}/>
                <label htmlFor="password">Contraseña</label>
              </div>
              <button type="submit" onClick={loginUser}>Iniciar sesión</button>
              <div className="signUp-link">
                <p>¿No tienes una cuenta?</p>
                <p><a href="register" className="signUpBtn-link"><b>Regístrate aquí</b></a></p>
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
