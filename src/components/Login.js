import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth"
import "../styles/navbar.css"
import "../styles/login.css"
import { auth } from "../firebase";

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')
    const [success, setSuccess] = useState(false);

    const usernameRef = useRef()
    const errRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
            console.log(userCredential)
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        //usernameRef.current.focus()
    }, [])

    useEffect(() => {
        setError('');
    }, [username, password])

    return (
        <>
            {success ? (
                <section>
                    <h1>Login in Successful</h1>
                    <br />
                    <p>
                        <a href="/authuser">Go to account</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="text">E-mail: </label>
                        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="glowingUser@chi.com" name="username" required ref ={usernameRef}></input>
                        <label htmlFor="password">Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required></input>
                        <button type = "submit" >Login</button>
                    </form>
                    <br></br>
                    <li>
                            <Link style={{ textDecoration: 'none', color:'black' }} to='/register'>Register</Link>
                    </li>
                </section>
            )}

        </>
    )
}