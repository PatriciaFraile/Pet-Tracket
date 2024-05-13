import React from "react";

const SignIn=()=>{
    return(
        <div>
            <center>
            <div className="row mt-5">
                <div className="col-6">
                    <div className="row mt-2">
                        <p>Imagen</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row mt-5">
                        <div className="wrapper">
                        <h2>Inicio de sesion</h2>
                            <div className="form-wrapper sign-in">
                                <form action="">
                                    <div className="input-group">
                                        <input type required/>
                                        <label for="">Usuario</label>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" required/>
                                        <label for="">Contraseña</label>
                                    </div>
                                    <div className="remember">                                    
                                        <label for=""><input type="checkbox" /><b>Recordar Contraseña</b></label>
                                    </div>
                                    <button type="submit">Iniciar sesion</button>
                                    <div className="signUp-link">
                                        <p>¿No tienes una cuenta? </p>
                                        <p><a href="#"className="signUpBtn-link"><b>Registrate aqui</b></a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </center>
            
        </div>
        

    );

}
export default SignIn