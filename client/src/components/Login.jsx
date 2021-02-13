import React, { useEffect, useState } from "react"
import Login from '../apis/Login';
import { useHistory } from "react-router-dom";

import axios from "axios";

const LoginPage = (props) => {

  const [user_email, setuser_email] = useState("");
const [user_password, setuser_password] = useState("");


let history = useHistory();
const [isSubmit, setIsSubmit] = useState("");

useEffect(() => {
  if (localStorage.getItem('user-info')){
    history.push("/Holidays")
  }
}, [])
const handleSubmit = async (e, id) => {
  e.preventDefault();
  try{
    
  }
  catch(err) {

  }
}
async function login(){
  console.warn(user_email,user_password);
  const item = {user_email,user_password};

  
  const result =  await fetch("http://localhost:3000/api/v1/business/login" , {
  method:'POST',
  headers:{
    "Content-type": "application/json",
    "Accept": 'application/json'
  },
  body: JSON.stringify(item)
  });
  result = await result.json();
  localStorage.setItem("user-info",JSON.stringify(result))
}



    return (
        <div className="Services">
<form action="">
        <div className="form-group">
            <label>business_name</label>
            <input 
             value={user_email}
             onChange={(e) => setuser_email(e.target.value)}
            type="text" 
            className="form-control" 
            id="businessname"  
            placeholder="business_name" />
        </div>
        <div className="form-group">
            <label>province</label>
            <input 
             value={user_password}
             onChange={(e) => setuser_password(e.target.value)}
            type="text" 
            className="form-control" 
            id="businessname"  
            placeholder="province" />
        </div>
      

</form>
{/* <input type="submit" value="Submit"  onClick={loginauth} className="btn btn-primary" /> */}
<button type="submit" onClick={login}>Submit</button>

        </div>
    )
}

export default LoginPage

