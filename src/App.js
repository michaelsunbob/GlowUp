import './App.css';
import { Login } from "./login"
import React, { useState } from "react";
import { Register } from "./register"

function App() {
  const [Form, setForm] = useState('login')

  const tForm = () =>{
    
  }
  return (
    <div className="App">
      {
        Form === 'login' ? <Login/> : <Register />
      }
    </div>
  );
}

export default App;