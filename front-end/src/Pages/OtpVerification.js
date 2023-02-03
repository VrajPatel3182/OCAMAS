import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const OtpVerification = () => {
  const[otp,setOtp]=useState('');
  const navigate = useNavigate();

  const handleotpmatch=async()=>{
    const sotp = sessionStorage.getItem('otp');
      var result = await bcrypt.compare(otp,sotp);
      console.log(sotp)
      if(result)
      {
        navigate('/Pages/changepassword')
      }
      else{
        alert("not match")
      }
  } 

  return (
    <div>
        <div className="login">
            <h1 className="heading">Verify OTP</h1>
            <input type="text" className="inputBox" placeholder="Enter your OTP" onChange={(e)=>setOtp(e.target.value)} value={otp} />
            <div>
                <button className="appButton" onClick={handleotpmatch} type="button">Verify</button>
            </div>
        </div>
    </div>
  )
}

export default OtpVerification