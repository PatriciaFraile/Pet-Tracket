import React , {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"
import { useEffect } from "react"


const SignUp=()=>{
    const [ user, setUser] = useState({})
    //const navigate = useNavigate()
    //const [registered, setRegistered] = useState(false)

    /*if (registered) {
        return navigate('/home')
      } sale error*/

    let eventHandle = (e) =>{
        setUser((e1)=>{
            return{...e1 , [e.target.id] : e.target.value}
        })
    }
    

    
    const addUsers = ()=>{
        try{
            const response = axios.post("http://127.0.0.1:8080/add_user",user)
            console.log(response.data);
            Swal.fire({
                position :"center",
                icon: "success",
                title : "Added user",
                showConfirmButton:false,
                timer:2000

            })
           // setRegistered(true)

        }catch(error){
            console.error(error)
            Swal.fire({
                position :"center",
                icon: "error",
                title : "User not added",
                showConfirmButton:false,
                timer:2000

            })
        }

    }
    

    
    return(
        <div className="wrapper mt-5">
            <div className="form-wrapper sign-up">
                <form action="">
                    <div className="input-group">
                        <input type id="username" required onKeyUp={(e)=>{
                            eventHandle(e)
                        }}/>
                        <label for="">Usuario</label>
                    </div>
                    <div className="input-group">
                        <input type  id="name" required onKeyUp={(e)=>{
                            eventHandle(e)
                        }}/>
                        <label for="">Nombre</label>
                    </div>
                    <div className="input-group">
                        <input type="email" id="email" required onKeyUp={(e)=>{
                            eventHandle(e)
                        }}/>
                        <label for="">email</label>
                    </div>
                    <div className="input-group">
                        <input type="password"  id="password" required onKeyUp={(e)=>{
                            eventHandle(e)
                        }}/>
                        <label for="">Contraseña</label>
                    </div>
                                   
                    <button type="submit" onClick={addUsers}>Crear cuenta</button>
                                    
                    </form>
            </div>


        </div>
    )

}
export default SignUp