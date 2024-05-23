import React, {useState} from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post('https://3v3zpv2z-80.uks1.devtunnels.ms/login', user);
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
    <div>
      <center>
        <div className="row mt-5 justify-content-center">
          <div className="col-md-4">
            <div className="image-container">
              <div className="image-background"></div>
              <img src="/images/caraPerroGato.png" alt="Imagen de inicio de sesión" className="imgLogin" />
            </div>
          </div>
          <div className="col-md-4">
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
                  <div className="remember">
                    <label htmlFor="">
                      <input type="checkbox" /><b>Recordar Contraseña</b>
                    </label>
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
        </div>
      </center>
    </div>
  );
};

export default SignIn;
