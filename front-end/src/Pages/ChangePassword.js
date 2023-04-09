import React, { useState } from 'react'

const ChangePassword = () => {

  const[password, setNewpass] = useState();
  const[conpass, setConpass] = useState();

  const user_id = localStorage.getItem('userid').replace(/['"]+/g, '');

  const handlechangepass = async() => {
    if(password===conpass){
    let result = await fetch('http://localhost:5000/update-password',{
            method:'put',
            body:JSON.stringify({password,user_id}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    result = await result.json();
    alert("changed");
    console.log(result) 
    }else{
      alert("not set");
    }
  }

  return (
   
      <div className="login">
      <h1 className="heading">Create New Password</h1>
      <form onSubmit={handlechangepass}>
            
              <input type="password" className="inputBox" placeholder="New Password" 
                     onChange={(e)=>setNewpass(e.target.value)} value={password} 
                     required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
              <input type="password" className="inputBox" placeholder="Confirm Password" onChange={(e)=>setConpass(e.target.value)} value={conpass} required/>
            <button className="btn-5"  type="submit" >CHANGE PASSWORD</button>
            </form> 
        </div>
    
  )
}

export default ChangePassword