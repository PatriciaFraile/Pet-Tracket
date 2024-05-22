import React from "react";

const SignIn = () => {
  return (
    <div>
      <center>
        <div className="row mt-5 justify-content-center">
          <div className="col-md-4">
            <div className="image-container">
              <div className="image-background"></div> {/* Nuevo div para el fondo circular blanco */}
              <img src="/images/caraPerroGato.png" alt="Imagen de inicio de sesión" className="imgLogin" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="wrapper">
              <h2>Inicio de sesión</h2>
              <div className="form-wrapper sign-in">
                <form action="">
                  <div className="input-group">
                    <input type="text" required />
                    <label htmlFor="">Usuario</label>
                  </div>
                  <div className="input-group">
                    <input type="password" required />
                    <label htmlFor="">Contraseña</label>
                  </div>
                  <div className="remember">
                    <label htmlFor="">
                      <input type="checkbox" /><b>Recordar Contraseña</b>
                    </label>
                  </div>
                  <button type="submit">Iniciar sesión</button>
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
