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
    <div>
      <div className="login">
            <h1 className="heading">Create New Password</h1>
              <input type="password" className="inputBox" placeholder="New Password" onChange={(e)=>setNewpass(e.target.value)} value={password}/>
              <input type="password" className="inputBox" placeholder="Confirm Password" onChange={(e)=>setConpass(e.target.value)} value={conpass} />
            <div className="btn-5"  type="button" onClick={handlechangepass}>CHANGEPASSWORD</div>
        </div>
    </div>
  )
}

export default ChangePassword