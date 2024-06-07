import React, { useState } from 'react';
import './Register.css';

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');


  
  var user={}
  
  var Register=(e)=>{
    
    
          e.preventDefault();
          user.userFirstName=firstName;
          user.userLastName=lastName;
          user.userPassword = password
          user.confirmPassword = confirmPassword;
          user.userEmail=email;
          user.userAddress=address;
          user.userContact=contact;
          user.userGender=gender;

          console.log(user);
          var RequestOption = {
              method : 'POST',
              headers : {'Content-type':'application/json'},
              body : JSON.stringify(user)
            }

  fetch("http://localhost:5169/api/Auth/User/Register",RequestOption)
      .then(res=>res.json())
      .then(res=>{
        console.log(res);
        alert("User successfully registered")
      })
      .catch(err=>{console.log(err)
        alert("User already present")})

    
}


  return (
    <section class="signup">
    <div class="container">
    <div class="signup-content">
    <div class="signup-form">
    <h2 class="form-title">Sign up</h2>
    <form method="POST" class="register-form" id="register-form">
    <div class="form-group">
    <label for="firstName"><i class="zmdi zmdi-account material-icons-name"></i></label>
    <input type="text" name="firstName" id="firstName" placeholder="Your First Name" value={firstName} 
    onChange={(e) => setFirstName(e.target.value)} />
    </div>
    <div class="form-group">
    <label for="lastName"><i class="zmdi zmdi-account material-icons-name"></i></label>
    <input type="text" name="lastName" id="lastName" placeholder="Your Last Name" value={lastName} 
    onChange={(e) => setLastName(e.target.value)}/>
    </div>
    <div class="form-group">
    <label for="email"><i class="zmdi zmdi-email"></i></label>
    <input type="email" name="email" id="email" placeholder="Your Email" value={email} 
    onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div class="form-group">
    <label for="pass"><i class="zmdi zmdi-lock"></i></label>
    <input type="password" name="password" id="password" placeholder="Password" value={password} 
    onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div class="form-group">
    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} 
    onChange={(e) => setConfirmPassword(e.target.value)}/>
    </div>
    <div class="form-group">
    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
    <input type="text" name="gender" id="gender" placeholder="Gender" value={gender} 
    onChange={(e) => setGender(e.target.value)}/>
    </div>
    <div class="form-group">
    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
    <input type="text" name="address" id="address" placeholder="Address" value={address} 
    onChange={(e) => setAddress(e.target.value)}/>
    </div>
    <div class="form-group">
    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
    <input type="number" name="contact" id="contact" placeholder="Contact" value={contact} 
    onChange={(e) => setContact(e.target.value)}/>
    </div>
    <div class="form-group">
    <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
    <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in <a href="#" class="term-service">Terms of service</a></label>
    </div>
    <div class="form-group form-button">
    <button type="submit" name="signup" id="signup" class="form-submit" onClick={Register} value="Register">Submit</button>
    </div>
    </form>
    </div>
    <div class="signup-image">
    
    {/* <a href="#" class="signup-image-link">I am already member</a> */}
    </div>
    </div>
    </div>
    </section>
  );
};

export default RegistrationPage;
