import './App.css';
import { Login } from "./login"
import React, { useState } from "react";
import { Register } from "./register"

function App() {
  const [Form, setForm] = useState('login')

  const tForm = (name) =>{
    setForm(name)
  }
  return (
    <div className="App">
      {
        Form === 'login' ? <Login onSwitch = {tForm}/> : <Register onSwitch = {tForm}/>
      }
    </div>
  );
}

export default App;