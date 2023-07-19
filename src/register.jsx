import React, { useState } from "react";

export const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Full Name: </label>
                <input value = {name} onChange = {(e) => setName(e.target.value)}></input>
                <label for = "email">E-mail: </label>
                <input type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "glowingUser@chi.com" name = "email"></input>
                <label for = "password">Password: </label>
                <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} name = "password" ></input>
                <button type = "submit">Register</button>
            </form>
            <br></br>
            <button onClick = {() => props.onSwitch('login')}>Have an account? Login instead.</button>
        </div>
    )
}