import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import "../styles/login.css"

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')
    const [success, setSuccess] = useState(false);

    const emailRef = useRef()
    const errRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true);
    }

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setError('');
    }, [email, password])

    return (
        <>
            {success ? (
                <section>
                    <h1>Login in Successful</h1>
                    <br />
                    <p>
                        <a href="/">Take the Quiz!</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label for="email">E-mail: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="glowingUser@chi.com" name="email" required ref ={emailRef}></input>
                        <label for="password">Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required></input>
                        <button type="submit">Login</button>
                    </form>
                    <br></br>
                    <li>
                            <Link style={{ textDecoration: 'none', color:'white' }} to='/register'>Register</Link>
                    </li>
                </section>
            )}

        </>
    )
}