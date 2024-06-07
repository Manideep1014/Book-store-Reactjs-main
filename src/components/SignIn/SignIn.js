import React, { useState } from 'react';
import './SignIn.css';
import { useHistory } from "react-router-dom";
const LogInPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      
      const history = useHistory();
      var user = {};
      var Login = (e) => {
      
        e.preventDefault();
        user.email = email;
        user.password = password;
        // user.role = "";
        // user.token = "";
      
        var requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        };
    
        fetch("http://localhost:5169/api/Auth/Login", requestOptions)
          .then((res) => res.json())
          .then((res) => {
            // sessionStorage.setItem("token", res.token);
            // sessionStorage.setItem("username", res.username);
            // sessionStorage.setItem("role", res.role);
            console.log("login data when sucessfull : ",res);
            localStorage.setItem("token",res.token)
            history.push('');
          })
          .catch((err) => {
            console.log(err);
            alert("Login error")
          });
      };


      return (
        <section class="signin">
        <div class="container">
        <div class="signin-content">
        <div class="signin-form">
        <h2 class="form-title">Sign In</h2>
        <form method="POST" class="register-form" id="register-form">
        
        <div class="form-group">
        <label for="email"><i class="zmdi zmdi-email"></i></label>
        <input type="email" name="email" id="email" placeholder="Your Username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div class="form-group form-button">
        <input type="submit" name="signup" id="signup" class="form-submit" value="Login" onClick={Login} />
        </div>
        </form>
        </div>
        <div class="signup-image">

        </div>
        </div>
        </div>
        </section>
      );
    };
    
    export default LogInPage;
    