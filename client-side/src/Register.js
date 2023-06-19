import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

//import ReactDOM from "react-dom/client";

// regex to match numbers between 1 and 10 digits long
const validPassword = /^\d{1,10}$/;

export default function Register() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    let isValid = true;
    const { name, value } = target;
    // if (name ==='submit')
    // {console.log('in handle change')}
    if (name === "password") {
      isValid = validPassword.test(value);
    }
    if (isValid) {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    let username = inputs.username;
    let password = inputs.password;
    let email = inputs.email;
    let data = { username, password, email };
    console.log(username);
    //let id = 82; ///???? change username to be unique
    fetch("http://127.0.0.1:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //console.log(response);
          return response.json();
        }
        throw new Error("Request failed!");
        
      })
      .then((resJson) => {
        alert("user created");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: resJson.info.id,
            userName: resJson.info.username,
          })
        );
        navigate(`/users/${username}/home`);
      }).catch(err=>{
        alert("failed to create user. if you exist pleease go to login page")
      })
      ;
  };

  useEffect(() => {
    console.log("useefect");
  }, [inputs]);
  return (
    <div className="login-container">
      <h1>WELCOME</h1>
      <form
        //onSubmit={handleSubmit}
        className="login-form"
      >
        <input
          className="inputTypeIn"
          id="userNameInput"
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
          placeholder="Enter your name:"
          required
        />
        <input
          id="passwordInput"
          className="inputTypeIn"
          maxLength={10}
          type="password"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
          placeholder="Enter your password:"
          //required
        />
        <input
          id="emailInput"
          className="inputTypeIn"
          maxLength={10}
          type="email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
          placeholder="Enter your email:"
          //required
        />
        <input
          onClick={handleSubmit}
          id="submitButton"
          //type="submit"
          type="button"
          name="submit"
          value="LOG IN"
        />
      </form>
    </div>
  );
}
