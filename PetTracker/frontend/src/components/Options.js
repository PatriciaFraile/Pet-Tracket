import React from "react";
import gato from '../img/gato.jpg';
import perro from '../img/perro.jpg';

const Options = ()=>{
   
    return(
        <div className="bg-none">
            <div className="row">
                <div className="col">
                    <button className="button-dog"         style={{ backgroundImage: `url(${perro})` }}>Dog</button>
                </div>
                <div className="col">
                    <button className="button-cat"         style={{ backgroundImage: `url(${gato})` }}>cat</button>
                </div>
            </div>
        </div>
    )
}
export default Options