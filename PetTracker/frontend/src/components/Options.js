import React from "react";
import {useNavigate} from 'react-router-dom'

import gato from '../img/gato.jpg';
import perro from '../img/perro.jpg';
import fondoPerro from './imgs/perroFondo.jpeg';
import fondoGato from './imgs/gatofondo4.jpg'; 

const Options = () => {
    const navigate = useNavigate();

    const botonGato = () => {
        navigate('/cat');
    };

    const botonPerro = () => {
        navigate('/dog');
    };

    return(
        <div style={{ height: "800px", position: "relative" }}>
            <div className="fondo" style={{
                position: "absolute",
                width: "50%",
                height: "100%",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 160, 180, 1)), url(${fondoPerro})`,
                clipPath: "polygon(0 0, 100% 0, 0 100%, 0 100%)", 
                zIndex: -1,
                left: 0
            }}></div>
            
            <div className="fondo" style={{
                position: "absolute",
                width: "50%",
                height: "100%",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 160, 180, 1)), url(${fondoGato})`,
                clipPath: "polygon(0 0, 100% 100%, 100% 50%, 100% 0)", 
                zIndex: -1,
                right: 0
            }}></div>

            <h1 className="texto" style={{
                fontSize:'3rem',
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translateX(-50%)",
                color: 'black',
                zIndex: 1
            }}>¿De qué mascota dispones?</h1>
            
            <div className="d-flex justify-content-center" style={{ zIndex: 1, position: "relative", top: "50%" }}>
                <div className="col">
                    <button className="button-dog" onClick={botonPerro} style={{ marginLeft:'200px',backgroundImage: `url(${perro})` }}></button>
                </div>
                <div className="col">
                    <button className="button-cat" onClick={botonGato} style={{ marginLeft:'-400px', backgroundImage: `url(${gato})` }}></button>
                </div>
            </div>
        </div>
    )
}

export default Options;
