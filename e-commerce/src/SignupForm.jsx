import axios from "axios";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

axios.defaults.baseURL = 'http://localhost:3001'

const SignupForm = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    async function handleRegistration(e) {
        e.preventDefault();
        try{
            await axios.post('/register', {
                'email': username,
                'password': password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Registration Successful!');
        }
        catch(e){
            alert('Some error')
        }

    }

    return (
        <div>   
            <Navbar/>
             <form onSubmit={handleRegistration}>
  <div style={{'display':'flex','flexDirection':'column','marginTop':'20px'}}>
    <label for="staticEmail2">Email</label>
    <input type="text" id="staticEmail2" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)}>
    </input>
  </div>
  <div style={{'display':'flex','flexDirection':'column','marginTop':'20px'}}>
    <label for="inputPassword2">Password</label>
    <input type="password" id="inputPassword2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
  </div>
  <div>
    <button type="submit" className="login-btn">Sign Up</button>
  </div>
</form>
    </div>
    )
}

export default SignupForm;