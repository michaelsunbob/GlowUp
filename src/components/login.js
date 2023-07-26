import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import "../styles/login.css"

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')
    const [success, setSuccess] = useState(false);

    const usernameRef = useRef()
    const errRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true);
    }

    useEffect(() => {
        usernameRef.current.focus()
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
                        <a href="/">Take the Quiz!</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label for="text">E-mail: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="glowingUser@chi.com" name="username" required ref ={usernameRef}></input>
                        <label for="password">Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required></input>
                        <button type="submit">Login</button>
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