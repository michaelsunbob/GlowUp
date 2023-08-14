import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Login } from "./Login"
import { LoggedIn } from "./LoggedIn";
import { Link } from "react-router-dom"
import "../styles/profile.css"

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
                        <button className = "button"
                            onClick={authSignOut}>Sign Out
                        </button>
                    </> : <Login />
            }
        </div>
    )
}

export default AuthUser