import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom'

import imgFondo from '../img/deslizPerroGato.jpg'
import logo from '../img/logo.png'


const FrontPage = () => {
    const [text, setText] = useState('');
    const fullText = "Biienvenido a PetTracker,una aplicación que realiza un seguimiento de tu mascota! Para que siempre recuerdes todos sus cuidados y no se te olviden! "
    const navigate = useNavigate()


    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText((prev) => prev + fullText[index]);
            index++;
            if (index === fullText.length) {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const botonLogin = () => {
        navigate('/login')
    }
    const botonRegister = () => {
        navigate('/register')

    }

    return (
        <div className='home'>
            <motion.div
                initial={{ width: 0, height: 0 }}
                animate={{ width: '60%', height: '100%' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}>
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 5
            }}>
                <img
                    src={logo}      
                    alt=""
                    style={{
                        width: '200px',
                        height: 'auto'
                    }}          
                />
            </div>
                    <img 
                        src={imgFondo}
                        alt=""
                        style={{
                            width: '1200px',
                            height: '100%',
                            position: 'absolute',

                            zIndex: 1
                        }}
                    />
                    <div style={{
                        width:'1200px',
                        height: '100%',
                        position: 'absolute',
                        background: 'linear-gradient(to bottom,rgba(0, 0, 0, 0.5), rgba(0, 160, 180, 0.75))',
                        zIndex: 2
                    }}></div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '300px',
                    left: '20px',
                    color: 'white',
                    fontSize: '1.5rem',
                    padding: '40px',
                    borderRadius: '10px',
                    zIndex: 3
                }}>

                    {text}
                </div>
            </motion.div>
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '250px',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '200px',
                zIndex: 4
            }}>
            <button style={{
                    width: '300px',
                    height: '70px',
                    padding: '10px 20px',
                    fontSize: '1.5rem',
                    borderRadius: '100px',
                    cursor: 'pointer'
                }}
                onClick={botonLogin}
                >Iniciar Sesión</button>

                <button style={{
                    width: '300px',
                    height: '75px',
                    padding: '10px 20px',
                    fontSize: '1.5rem',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer'
                }}
                onClick={botonRegister}
                >Registrarse</button>
            </div>

        </div>
    );
}

export default FrontPage;