import React, { useState, useRef, useEffect } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase";
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import "../styles/login-register.css"

const userRegex = /^[A-z][A-z0-9-_]{2,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


export const Register = (props) => {
    const userRef = useRef()
    const errorRef = useRef()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [verifyPass, setVerifyPass] = useState('')
    const [validVerify, setValidVerify] = useState(false)
    const [verifyFocus, setVerifyFocus] = useState(false)

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect (() =>{
        //userRef.current.focus()
    }, [])

    useEffect (() => {
        const val = userRegex.test(username)
        setValidUsername(val)
    }, [username])

    useEffect(() => {
        const val = passwordRegex.test(password)
        setValidPassword(val)
        const same = password === verifyPass
        setValidVerify(same)
    }, [password, verifyPass])

    useEffect(() => {
        setErrorMessage('')
    }, [username, password, verifyPass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, username, password).then((userCredential) => {
            console.log(userCredential)
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            {success ? (
                <section>
                    <h1 style={{ textDecoration: 'none', color:'black' }}>Registration Successful</h1>
                    <br />
                    <p>
                        <a href="/quiz">Take the Quiz!</a>
                    </p>
                </section>
            ) : (
            <body>
                <section>
                    <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <div className = "wrapper">
                        <form onSubmit = {handleSubmit}>
                            <h1  style={{color:"#6B2E32"}}>Register</h1>
                            <div className = "input-box">
                                <label>Email: </label>
                                <input type = 'email' id = "username" ref = {userRef} value = {username} onChange = {(e) => setUsername(e.target.value)} required></input>
                                <p  id = "userError" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                    Must be 3 to 16 charcters long, begin with a letter and letters, numbers, underscores are to be used. End with @emailprovider
                                </p>
                            </div>
                            <div className = "input-box">
                                <label htmlFor = "password"> Password: </label>
                                <input type = 'password' id = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)} aria-invalid={validPassword ? "false" : "true"} 
                                aria-describedby= "passwordError" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} required></input>
                                <p id = "userError" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    Must be 8-24 characters. Must include at least 1 uppercase and 1 lowercase letter as well as  a number and a special
                                    character.
                                </p>
                            </div>
                            <div className = "input-box">
                                <label htmlFor = "password"> Verify Password: </label>
                                <input type = 'password' id = 'confirmPassword' value = {verifyPass} onChange = {(e) => setVerifyPass(e.target.value)} aria-invalid={validVerify ? "false" : "true"} 
                                aria-describedby= "passwordError" onFocus={() => setVerifyFocus(true)} onBlur={() => setVerifyFocus(false)} required></input>
                                <p id = "userError" className={verifyFocus && !validVerify ? "instructions" : "offscreen"}>
                                    Must match password previously choosen.
                                </p>
                            </div>
                            <button className = "button" type = "submit"disabled={ !validPassword || !validVerify ? true : false}>Register</button>
                        </form>
                        <br></br>
                        <Link style={{ color:'#a1797c' }} to='/account'>Login instead</Link>
                    </div>
                    
                </section>
            </body>  
            
            )}
        </>
    )
}
export default Register