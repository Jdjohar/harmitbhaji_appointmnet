import React, { useEffect, useState } from "react"
import Login from '../apis/Login';
import { useHistory } from "react-router-dom";

import axios from "axios";

const LoginPage = (props) => {

  const [email, setuser_email] = useState("");
  const [password, setuser_password] = useState("");


let history = useHistory();
const [isSubmit, setIsSubmit] = useState("");

// useEffect(() => {
//   if (localStorage.getItem('user-info')){
//     history.push("/Holidays")
//   }
// }, [])
const handleSubmit = async (e, id) => {
  e.preventDefault();
  try{
    
  }
  catch(err) {

  }
}
async function login(){
  //console.warn(email,password);
  const item = {email,password};

  
  let result =  await fetch("http://localhost:3000/api/v1/business/login" , {
  method:'POST',
  headers:{
    "Content-type": "application/json",
    "Accept": 'application/json'
  },
  body: JSON.stringify(item)
  });
  // result = await result.json();
  result = await result.json();
  console.log(result);
  localStorage.setItem("user-info",JSON.stringify(result))
}

async function loginWithFacebook() {
  const item = {email,password};
  
  let result = await fetch("http://localhost:3000/auth/facebook", {
    method:'GET',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  });
  result = await result.json();
  console.log(result);
}



    return (
        <div className="Services">
<form action="">
        <div className="form-group">
            <label>business_name</label>
            <input 
             value={email}
             onChange={(e) => setuser_email(e.target.value)}
            type="text" 
            className="form-control" 
            id="email"  
            placeholder="Email"
            name="email" />
        </div>
        <div className="form-group">
            <label>province</label>
            <input 
             value={password}
             onChange={(e) => setuser_password(e.target.value)}
            type="password" 
            className="form-control" 
            id="password"  
            placeholder="Password"
            name="password" />
        </div>
      

</form>
{/* <input type="submit" value="Submit"  onClick={loginauth} className="btn btn-primary" /> */}
<button type="submit" onClick={login}>Submit</button>
<button type="submit" onClick={loginWithFacebook}>Login With Facebook</button>

        </div>
    )
}

export default LoginPage

