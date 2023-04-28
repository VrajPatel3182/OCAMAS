import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryList, setCountries] = useState([]);
    const [stateList, setStates] = useState([]);
    const [cityList, setCities] = useState([]);
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedState, setSelectedState] = useState();
    const [selectedCity, setSelectedCity] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if(auth==="1"){
            navigate("/customer/home")
        }else{
            if(auth==="0")
            {
                navigate("/admin/home")
            }
        }
    }, [navigate])

    useEffect(()=>{
        (async () => {
            try {
                let country = await fetch('http://localhost:5000/viewcountry')
                country = await country.json();
                setCountries(country);
            } catch(e) {
                console.error('Error while fetching country:', e);
            }
        })()
    },[])

    useEffect(() => {
        if(selectedCountry) {
            (async () => {
                try {
                    let states = await fetch(`http://localhost:5000/states/${selectedCountry.id}`)
                    states = await states.json();
                    setStates(states)
                } catch(e) {
                    console.error('Error while fetching country:', e);
                }
            })()
        }
    },[selectedCountry])

    useEffect(() => {
        if(selectedCountry) {
            if(selectedState){
            (async () => {
                try {
                    let cities = await fetch(`http://localhost:5000/cities/${selectedCountry.id}/${selectedState.id}`)
                    cities = await cities.json();
                    setCities(cities)
                } catch(e) {
                    console.error('Error while fetching country:', e);
                }
            })()
            }
        }
    },[selectedCountry,selectedState])

    const collectData = async (e) => {
        e.preventDefault();

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You Are Registered.',
            showConfirmButton: false,
            timer: 1000
        })
        if(name != null && email != null && gender != null && selectedCountry!=null && selectedState!=null && selectedCity != null && address!=null && contact!=null && password!=null){
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password, country:selectedCountry.name, state: selectedState.name, city: selectedCity.name , address, gender, contact }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        // alert("you are registered :)");
        //localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));
          navigate('/pages/login');
        }
    }

    const handleCountrySelect = e => {
        try {
            setSelectedCountry(JSON.parse(e.target.value));    
        } catch{
            e.preventDefault();
        }
    }

    const handleStateSelect = e => {
        try {
            setSelectedState(JSON.parse(e.target.value));
        } catch{
            e.preventDefault();   
        }
        
    }

    const handleCitySelect = e => {
        try {
            setSelectedCity(JSON.parse(e.target.value));    
        } catch{
            e.preventDefault();
        }   
    }

    return (
        <div className="register">
            <h1 className='heading'>Registration</h1>
        <form onSubmit={collectData}>
            <div>
            <input className="inputBox" id="name" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
                required pattern="[A-Za-z]{}"
            />
            <input className="inputBox" type="email" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <div className="inputBox"><label className='genderlabel'>Gender :</label>
                <input className="radio1" type="radio" name="r1" value="m" onChange={(e)=>setGender(e.target.value)} defaultChecked/><label className='genderlabel'>Male</label>
                <input className="radio1" type="radio" name="r1" value="f" onChange={(e)=>setGender(e.target.value)} /><label className='genderlabel'>Female</label>
            </div>
                <div className='dwn'>
                <select onChange={handleCountrySelect} className="selectitem">
                    <option>Select Country</option>
                    {
                       countryList.map((country)=>(
                            <option key={country.id} value={JSON.stringify(country)}>{country.name}</option>
                        ))
                    }
                </select>
                </div>
                <div className='dwn'>
                <select  onChange={handleStateSelect} className="selectitem">
                    <option >Select State</option>
                    {
                       stateList.map((state)=>(
                            <option className='option' key={state.id} value={JSON.stringify(state)}>{state.name}</option>
                        ))
                    }
                </select>
                </div>
                <div className='dwn'>
                <select onChange={handleCitySelect}className="selectitem">
                    <option>Select City</option>
                    {
                       cityList.map((city)=>(
                            <option key={city.id} value={JSON.stringify(city)}>{city.name}</option>
                        ))
                    }
                </select>
                </div>
            <textarea type="text" className="textarea" value={address} placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)} required
                pattern="[A-Za-z]{}"
            />
            <input type="text"  className="inputBox" value={contact} placeholder="Enter Contact"
                onChange={(e) => setContact(e.target.value)} required
                pattern='[0-9]{10}'
            />
            <input className="inputBox" type="password" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)} required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <button  className="btn-5" type="submit">SignUP</button>
            {/* <div className="btn-5" type="submit">
                    SIGN-UP
                </div> */}
            </div>
            </form>
        </div>
    )
}

export default SignUp;