import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth"
import "../styles/navbar.css"
import "../styles/login-register.css"
import { auth } from "../firebase";
import { BiSolidUser, BiSolidLockAlt } from "react-icons/bi";


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
                    <body>
                        <section>
                            <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                            <div className = "wrapper">
                                <form onSubmit={handleSubmit}>
                                    <h1 style={{color:"#6B2E32"}}>Login</h1>
                                    <div className = "input-box">
                                        <label htmlFor="text">E-mail: </label>
                                        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="glowingUser@chi.com" name="username" required ref ={usernameRef}></input>
                                        <BiSolidUser className = "i"/>
                                    </div>
                                    <div className = "input-box">
                                        <label htmlFor="password">Password: </label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder = "Password" name="password" required></input>
                                        <BiSolidLockAlt className = "i"/>
                                    </div>
                                    <div className= "remember-forgot">
                                        <label><input type = "checkbox"/>Remember me</label>
                                    </div>
                                    <br></br>
                                    <button className = "button" type = "submit" >Login</button>
                                </form>
                                <br></br>
                                <div class = "register-link">
                                    <p style={{color:'#a1797c'}}>Don't have an account? <Link style={{color:'#a1797c' }} to='/register'>Register here</Link></p>
                                </div>
                            </div>
                        </section>
                    </body>
                
            )}

        </>
    )
}