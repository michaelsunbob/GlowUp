import React, { useState } from "react";

export const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit = {handleSubmit}>
            <label for = "email">E-mail: </label>
                <label>Full Name: </label>
                <input value = {name} onChange = {(e) => setName(e.target.value)}></input>
                <label for = "email">E-mail: </label>
                <input type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "glowingUser@chi.com" name = "email"></input>
                <label for = "password">Password: </label>
                <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} name = "password" ></input>
                <button type = "submit">Login</button>
            </form>
            <br></br>
            <button>Register</button>
        </>
    )
}