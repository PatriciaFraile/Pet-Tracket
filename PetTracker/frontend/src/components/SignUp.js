import React, {useState} from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignUp=()=>{

    const [user, setUser] = useState({});
    const [registered, setRegistered] = useState(false)
    const navigate = useNavigate()




    const eventHandle = (e) => {
        setUser((e1) => ({
            ...e1,
            [e.target.id]: e.target.value
        }));
    };

    if (registered) {
        return navigate("/home")
      }


    const addUser = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8080/add_user', user);
            console.log(response.data);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "User added",
                showConfirmButton: false,
                timer: 2000
            });
            setRegistered(true)

           

        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Not success",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    return (
        <div>
            <center>
                <div className="wrapper mt-3">
                    <h2>Sign Up</h2>
                    <div className="form-wrapper sign-in mt-3">
                        <form>
                            <div className="input-group">
                                <input type="text" id="name" required onKeyUp={eventHandle} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-group">
                                <input type="text" id="username" required onKeyUp={eventHandle} />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="input-group">
                                <input type="email" id="email" required onKeyUp={eventHandle} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" id="password" required onKeyUp={eventHandle} />
                                <label htmlFor="password">Password</label>
                            </div>

                            <button type="button" onClick={addUser}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </center>
        </div>
    );

}
export default SignUp