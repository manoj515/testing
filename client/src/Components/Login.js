import React,{useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {
    const [data,setData]=useState({
        email:'',
        password:''
    })
    const{email,password}=data;
    const handler=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const submi=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data)
        .then((res)=>localStorage.setItem("token",res.data))
    };
    if(localStorage.getItem("token")){
        return <Navigate to="/dashboard"/>;
    }
  return (
    <div>
        <center>
            <form onSubmit={submi}>
                <div className="d-flex flex-row">
                    <input type="email" name="email" value={email} onChange={handler}/>
                    <input type="password" name="password" value={password} onChange={handler}/>
                    <button>Login</button>
                </div>
            </form>
        </center>
    </div>
  )
}

export default Login;
