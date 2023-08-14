import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Login } from "./Login"
import { LoggedIn } from "./LoggedIn";
import { Link } from "react-router-dom"
import "../styles/profile.css"
import "../styles/profile.css"
import picture from "../assets/faq.png"

const AuthUser = () => {
    const [AuthUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, [])

    const authSignOut = () => {
        signOut(auth).then(() => {
            console.log("Successfully signed out")
        }).catch((error) => console.log(error))
    }

    const [modal, setModal] = useState(false);

    const toggleModal = () =>   {
        setModal(!modal)
    }   
    return (
        <div className = "wrapper">
            {
                AuthUser ?
                    
                    <><LoggedIn />
                        <br>
                        </br>
                        <p style={{ color: '#a1797c' }}>{`You are signed in as ${AuthUser.email}`}</p>
                        <br>
                        </br>
                        <p style={{ color: '#a1797c' }}>
                            To make the most out of your experience, make sure to <Link to="/quiz">take the Quiz!</Link>
                        </p>
                        <br>
                        </br>
                        <button onClick = {toggleModal} className="button">FAQ</button>

                        {modal && 
                            <div className="modal">
                            <div onClick = {toggleModal}  className="overlay"></div>
                            <div className="modal-content">
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <br>
                                </br>
                                <img className= "picture" src = {picture}></img>
                                <button className = 'close-modal' onClick={toggleModal}>X</button>   
                            </div>
                            </div>
                        }
                        
                        <br>
                        </br>
                        <br>
                        </br>
                        <button className = "button"
                            onClick={authSignOut}>Sign Out
                        </button>
                    </> : <Login />
            }
        </div>
    )
}

export default AuthUser