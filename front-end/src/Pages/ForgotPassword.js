import React from 'react'
import {useNavigate}  from 'react-router-dom';
import bcrypt from 'bcryptjs';

const ForgotPassword = () => {
  const [email,setEmail]=React.useState('');
  const navigate = useNavigate();
  
  const handleforgotpassword=async()=>{
    try{
      let otp = Math.floor(100000 + Math.random() * 900000);
      let otpm = String(otp);
      var salt = await bcrypt.genSalt(10)
      var hashedotp =  await bcrypt.hash(otpm,salt)
      sessionStorage.setItem('otp',hashedotp);
      navigate('/Pages/otpverification');
      let result = await fetch('http://localhost:5000/forgotpassword',{
        method:"post",
        body:JSON.stringify({email,otp}),
        headers:{
            'Content-Type':'application/json'
        }
      });
      result = await result.json();
      localStorage.setItem('userid',JSON.stringify(result._id))
      
    }
    catch{
      alert("error");
    }
  }

  return (
    <div>
        <div className="login">
            <h1 className="heading">ForgotPassword</h1>
            <input type="text" className="inputBox" placeholder="Enter your Email..." onChange={(e)=>setEmail(e.target.value)} value={email} />
            <div>
                <button className="appButton" onClick={handleforgotpassword} type="button">Send OTP</button>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword;