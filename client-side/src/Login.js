import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

//import ReactDOM from "react-dom/client";

// regex to match numbers between 1 and 10 digits long
const validPassword = /^\d{1,10}$/;

export default function Login() {
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
    let userName = inputs.username;
    let password = inputs.password;
    console.log(password);
    //let id = 12; ///???? change username to be unique
    fetch(`http://127.0.0.1:3001/users/${userName}`)
      .then(
        (response) => {
          if (response.ok) {
            //console.log(response);
            return response.json();
          }
          throw new Error("Request failed!");
        },
        (networkError) => {
          console.log(networkError.message);
        }
      )
      .then((jsonResponse) => {
        if (jsonResponse.length != 0) {
          // if the username exists

          let userPasswordQuery = jsonResponse[0].password;
          let userNameQuery = jsonResponse[0].username;
          if (userPasswordQuery == password && userName == userNameQuery) {
            alert("You are logged in");
            let user = { id: jsonResponse[0].id, userName: userName };
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate(`users/${userName}/home`);
          } else {
            alert("The password you entered is wrong");
            setInputs((values) => ({ ...values, ["password"]: "" }));
          }
        } else {
          alert("The username you entered is wrong");
        }
      });
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
