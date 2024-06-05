import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import backgroundImage from './imgs/gatofondo4.jpg';

const SignUp = () => {
    const [users, setUsers] = useState({});
    const [registered, setRegistered] = useState(false)
    const navigate = useNavigate()

    const eventHandle = (e) => {
        setUsers((e1) => ({
            ...e1,
            [e.target.id]: e.target.value
        }));
    };

    if (registered) {
        return navigate("/login")
    }

    const addUser = async () => {
        try {
            const response = await axios.post('https://3v3zpv2z-8080.uks1.devtunnels.ms/register', users);
            console.log(response.data);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario añadido",
                showConfirmButton: false,
                timer: 2000
            });
            setRegistered(true)

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

    const account = () => {
        navigate('/login')
    }

    return (
        <div style={{ 
            display: "flex",
            height: "100vh"
            }}>      
        
            <div style={{
                flex: 1,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 160, 180, 1)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} />
                  <div style={{
                    flex: 1,
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
            <center className="shadow-2xl">
                <div className="wrapper mt-5">
                    <h2>Registrarse</h2>
                    <div className="form-wrapper sign-in shadow-2xl">
                        <form style={{
                            maxHeight: '400px'
                        }}>
                            <div className="input-group">
                                <input type="text" id="name" required onKeyUp={eventHandle} />
                                <label htmlFor="name">Nombre</label>
                            </div>
                            <div className="input-group">
                                <input type="text" id="username" required onKeyUp={eventHandle} />
                                <label htmlFor="username">Nombre de Usuario</label>
                            </div>
                            <div className="input-group">
                                <input type="email" id="email" required onKeyUp={eventHandle} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" id="password" required onKeyUp={eventHandle} />
                                <label htmlFor="password">Contraseña</label>
                            </div>

                            <button type="button" onClick={addUser}>Registrarse</button>
                            <div>
                                <h3>¿Ya tienes una cuenta?</h3>
                                <button  onClick={account} style={{
                                    maxWidth: '200px'
                                }}>Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </center>

                  </div>
        </div>
    );
}
export default SignUp;
