import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import "../styles/home.css"

export default function Home() {
    const [User, setUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return () => {
            listen()
        }
    }, [])

    return (
            <div className="home-container">
                {User ? (
                    <div>
                        <h2 className="welcome-text">
                            Welcome!
                        </h2>
                        <div className="home-title">Ready to continue your skincare journey?</div>
                    </div>
                    )  : <p className="about-text">About GlowUp</p>
                }

                {User ? (
                    <p>
                        Check out your <Link to="/routines">routine page</Link>
                    </p>
                ) : (
                    <div>
                        <p className="about-section">
                            Life can get really busy. However, an important part of our 
                            overall health is how we treat our skin. We all want to look and feel our best, and taking 
                            good care of our skin is important for more than just appearance. Our app is designed to 
                            make skincare easy by offering personalized recommendations, tracking your skincare products, 
                            and providing a simple way to establish a routine that truly works for you.
                        </p>
                        <div className="login-links">
                            To get the most of GlowUp, you can <Link className="login-links" to="/register">sign up here.</Link>
                            <br/> 
                            Or <Link className="login-links" to="/account">log in</Link> 
                        </div>
                    </div>
                    )
                }
            </div>
    )
}
