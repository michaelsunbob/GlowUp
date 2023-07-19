import './App.css'
import React, { useState } from "react"
import { Login } from "./Login"
import { Register } from "./Register"
import { NavigationBar} from "./NavigationBar"

function App() {
  const [Form, setForm] = useState('login')

  const tForm = (name) =>{
    setForm(name)
  }
  return (
    <div className="App">
      <NavigationBar/>
      {
        Form === 'login' ? <Login onSwitch = {tForm}/> : <Register onSwitch = {tForm}/>
      }

    </div>
  );


}

export default App;