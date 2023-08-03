import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import "../styles/navbar.css"
import "../styles/register.css"

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

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: username,
            password: password
        }).then((response) =>{
            console.log(response);
        });
    };
    

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
    }

    return (
        <section>
            <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <form onSubmit = {handleSubmit}>
                <h1>Register</h1>
                <label>Username: </label>
                <input type = 'text' id = "username" ref = {userRef} value = {username} onChange = {(e) => setUsername(e.target.value)} aria-invalid={validUsername ? "false" : "true"} 
                   aria-describedby= "userError" onFocus={() => setUsernameFocus(true)} onBlur={() => setUsernameFocus(false)} required></input>
                <p id = "userError" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                    Must be 3 to 16 charcters long, begin with a letter and letters, numbers, underscores are to be used.
                </p>
                <br></br>
                <br></br>
                <label htmlFor = "password"> Password: </label>
                <input type = 'password' id = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)} aria-invalid={validPassword ? "false" : "true"} 
                   aria-describedby= "passwordError" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} required></input>
                <p id = "userError" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    Must be 8 to 24 characters. Must include at least 1 uppercase and 1 lowercase letter as well as  a number and a special
                    character.
                </p>
                <br></br>
                <br></br>
                <label htmlFor = "password"> Verify Password: </label>
                <input type = 'password' id = 'confirmPassword' value = {verifyPass} onChange = {(e) => setVerifyPass(e.target.value)} aria-invalid={validVerify ? "false" : "true"} 
                   aria-describedby= "passwordError" onFocus={() => setVerifyFocus(true)} onBlur={() => setVerifyFocus(false)} required></input>
                <p id = "userError" className={verifyFocus && !validVerify ? "instructions" : "offscreen"}>
                    Must match password previously choosen.
                </p>
                <br></br>
                <br></br>
                <button onClick = {register}disabled={!validUsername || !validPassword || !validVerify ? true : false}>Register</button>
            </form>
            <br></br>
            <Link style={{ textDecoration: 'none', color:'black' }} to='/account'>Login instead</Link>
        </section>
    )
}
export default Register
