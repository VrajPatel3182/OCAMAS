import React, { useEffect } from "react";
import {useNavigate,Link} from "react-router-dom";
//import jwt from 'jsonwebtoken';

const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate = useNavigate();

    //     const user = jwt.decode(token)
    useEffect(()=>{
        const auth = localStorage.getItem('auth');
        if(auth==="1"){
            navigate('/customer/home')
        }else{
            if(auth==="0"){
                navigate('/admin/home')
            }
        }
    })
        
    const handleLogin= async ()=> {
        // console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:"post",
            body:JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        // console.warn(result);
        if(result.auth)
        {
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('userid',JSON.stringify(result.user._id));
            localStorage.setItem('auth',JSON.stringify(result.user.usertype));
            localStorage.setItem('token',JSON.stringify(result.auth));
            //localStorage.setItem('token',JSON.stringify(result.auth));
            const usertype =  localStorage.getItem('auth');
            if(usertype==="1")
            {
                navigate('/customer/home')
            }else{
                if(usertype==="0")
                {
                    navigate('/admin/home')
                }
            }
        }
        else{
            alert("Enter Valid Username and Password")
        }

        //cosnt usertype = localStorage.getItem()

        // if(JSON.stringify(result.user.usertype)==="1")
        // {
        //      navigate("/customerHome")
        // }else{
        //     if(JSON.stringify(result.user.usertype)==="0")
        //     {
        //           navigate("/adminHome")
        //     }
        //     else{
        //         alert("INVALID USER");
        //     }
        // }
    }
     
    return(
        <div className="login">
            <h1 className="heading">Login</h1>
            <input type="text" className="inputBox" placeholder="Username" 
            onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <div>
                <button onClick={handleLogin} className="appButton" type="button">Login</button>
                <Link to="/Pages/forgotpassword">Forgot Password?</Link>
            </div>
        </div>
    )
}

export default Login;