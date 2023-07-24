import React, { useState } from "react"
import { Login } from "../components/login"
import { Register } from "../components/Register"

export default function Account() {
    const [Form, setForm] = useState('login')

    const tForm = (name) => {
        setForm(name)
    }

    return (
        <div>
            {
                Form === 'login' ? <Login onSwitch={tForm} /> : <Register onSwitch={tForm} />
            }
        </div>
    )
}