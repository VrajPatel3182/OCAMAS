import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

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
        alert("You are Registered.")
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password, country:selectedCountry.name, state: selectedState.name, city: selectedCity.name , address, gender, contact }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        //localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate("/Pages/login");
    }

    const handleCountrySelect = e => {
        setSelectedCountry(JSON.parse(e.target.value));
    }

    const handleStateSelect = e => {
        setSelectedState(JSON.parse(e.target.value));
    }

    const handleCitySelect = e => {
        setSelectedCity(JSON.parse(e.target.value));
    }

    return (
        <div className="register">
            <h1>Registration</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="email" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <div className="gender">Gender:
                <input className="radio1" type="radio" name="r1" value="m" onChange={(e)=>setGender(e.target.value)} /><span>Male</span>
                <input className="radio1" type="radio" name="r1" value="f" onChange={(e)=>setGender(e.target.value)} /><span>Female</span>
            </div>
            <div >
                <Form.Select className="selectitem" onChange={handleCountrySelect}>
                    <option>Select Country</option>
                    {
                       countryList.map((country)=>(
                            <option key={country.id} value={JSON.stringify(country)}>{country.name}</option>
                        ))
                    }
                </Form.Select>
            </div>
            <div >
                <Form.Select className="selectitem" onChange={handleStateSelect}>
                    <option>Select State</option>
                    {
                       stateList.map((state)=>(
                            <option key={state.id} value={JSON.stringify(state)}>{state.name}</option>
                        ))
                    }
                </Form.Select>
            </div>
            <div >
                <Form.Select className="selectitem" onChange={handleCitySelect}>
                    <option>Select City</option>
                    {
                       cityList.map((city)=>(
                            <option key={city.id} value={JSON.stringify(city)}>{city.name}</option>
                        ))
                    }
                </Form.Select>
            </div>
            <textarea type="text" className="textarea" value={address} placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)} required
            />
            <input type="number" pattern='[1-9]{1}[0-9]{9}'  className="inputBox" value={contact} placeholder="Enter Contact"
                onChange={(e) => setContact(e.target.value)} required
            />
            <input className="inputBox" type="password" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;