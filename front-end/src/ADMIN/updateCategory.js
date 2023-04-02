import React, { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

const updateCategory = () => {

  const[name, setCategory]=useState('');
  const params = useParams();

  //const navigate = useNavigate();
  // const location = useLocation();
  // console.log('location', location.state.id)

  useEffect(()=>{
    getCategoryname();
  },[])

  const getCategoryname = async() =>{
    let result = await fetch(`http://localhost:5000/viewcategory/${params.id}`);
    result =await result.json()
    setCategory(result[0].name)
    //console.log(result[0].name)
  }

  const handleUpdate = async(e) =>{
    if(name!=null){
      let result = fetch(`http://localhost:5000/updatecategory/${params.id}`,{
      method:'put',
      body:JSON.stringify({name}),
      headers:{
        'Content-Type':"application/json"
      }
    });
    result = await result.json();
    console.log(result);
    }else{
      e.preventDefault();
    }
    
  }

  return (
    <div className="category">
      <h1 className="heading">Category Update</h1>
      <form onSubmit={handleUpdate}>
          <input className="inputBox" onChange={(e)=>setCategory(e.target.value)} value={name} required/>
        <div className='btn-5' type='submit'>submit</div>
      </form>
    </div>
  )
}

export default updateCategory