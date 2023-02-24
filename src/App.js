import './App.css';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";




function App() {


  const [user, setUser] = useState('');
  const [Id, setId] = useState('')

  const ndate = new Date().toLocaleString()

  function searchId() {
    if (Id.length !== 14){
      alert('write ID well')
    }else{
      axios.get(`http://localhost:3000/users?id=${Id}`).then((res) => {
        if (res.data.length === 0){
          axios.post('http://localhost:3000/users',{
            id:Id,
            date:ndate
          }).then((respo)=>{
            console.log(respo);
            setUser(respo.data)
          })        
        }else{
          setUser(res.data[0]);    
        }
      })
    }
  }

 
  function  updateUser(){
    const ndate = new Date().toLocaleString()
    const response = axios
      .put(`http://localhost:3000/users/${Id}`, {
        id:Id,
        date:ndate
      })
      .catch((error) => {
        console.log(error);
      })
      alert("Time updated")
    console.log(response.PromiseResult)

    updateTime()
    }

function updateTime() {
  
}

  return (
    <div className="App">
      <header className="App-header">

      <div className='img'></div>

      <div className='btns'>
          <button className='btn btn-ser' onClick={searchId}>Search</button>
          <button className='btn btn-up' onClick={updateUser}>Update</button>
{/* 
          <Button id='btn' color="success" size="large" variant="contained" onClick={searchId}>Search</Button>
          <Button id='btn' size="large"  variant="contained" onClick={updateUser}>Update</Button> */}
      </div>
        
        <TextField
          id="standard-basic"
          label="ID"
          variant="standard"
          onChange={(e) => {
            setId(e.target.value);
          }}

          
        />
        
        {<>
            <h4>{user.id}</h4>
            <p>{user.date}</p>
        </>
        }



      </header>
    </div>
  );
}

export default App;
