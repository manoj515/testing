import React, { useState } from "react";
import { message } from "antd";
import './styles.css';

//import {Link} from "react-router-dom"

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { name, email, password, confirmpassword } = data;
  const changeHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handle = (e) => {
    e.preventDefault();
    setTimeout(() => {
      message.success("Register Sucess");
    }, 1000);
    fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log(data);
  };
  return (
    <div>
      <center>
        <form onSubmit={handle}>
          <div className="d-flex flex-column regi-text">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={changeHandle}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={changeHandle}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={changeHandle}
            />
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={changeHandle}
            />
            <button>Submit</button>
          </div>
        </form>
        <img src="https://img.freepik.com/free-photo/painting-flowers-with-purple-flower-left_1340-23754.jpg?w=1060&t=st=1686221066~exp=1686221666~hmac=2177d1a2ce660f7ff838039cf62a93ae8e49653bed7846a4432e6cb3b9ffdbc9" className="regi-pict" alt=""/>
      </center>
    </div>
  );
};

export default Register;
