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
    
    const [modal2, setModal2] = useState(false);

    const toggleModal2 = () =>   {
        setModal2(!modal2)
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
                        <button onClick = {toggleModal2} className="button">Studies</button>
                        {modal2 && 
                            <div className="modal">
                            <div onClick = {toggleModal2}  className="overlay"></div>
                            <div className="modal-content">
                                <p>Studies to support skincare claims:</p>
                                <br></br>
                                <p>Vitamin C (Ascorbic Acid)</p>
                                <ul>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5605218/">Topical Vitamin C and the Skin: Mechanisms of Action and Clinical Applications - PMC</a></li>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3673383/">Vitamin C in dermatology - PMC</a></li>
                                </ul>
                                <br></br>
                                <p>Retinol/Tretinoin</p>
                                <ul>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2699641/">Retinoids in the treatment of skin aging: an overview of clinical efficacy and safety</a></li>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9112391/">Topical tretinoin for treating photoaging: A systematic review of randomized controlled trials - PMC</a></li>
                                </ul>
                                <br></br>
                                <p>Niacinamide</p>
                                <ul>
                                    <li><a href="https://pubmed.ncbi.nlm.nih.gov/16029679/">Niacinamide: A B vitamin that improves aging facial skin appearance</a></li>
                                    <li><a href="https://pubmed.ncbi.nlm.nih.gov/12100180/">The effect of niacinamide on reducing cutaneous pigmentation and suppression of melanosome transfer</a></li>
                                </ul>
                                <br></br>
                                <p>Azelaic Acid</p>
                                <ul>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9975535/">Real-World Case Studies Showing the Effective Use of Azelaic Acid in the Treatment, and During the Maintenance Phase, of Adult Female Acne Patients - PMC</a></li>
                                    <li><a href="https://pubmed.ncbi.nlm.nih.gov/1712709/">Azelaic acid. A review of its pharmacological properties and therapeutic efficacy in acne and hyperpigmentary skin disorders </a></li>
                                </ul>
                                <br></br>
                                <p>AHA and BHA</p>
                                <ul>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6017965/">Dual Effects of Alpha-Hydroxy Acids on the Skin - PMC</a></li>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3941867/">Hydroxy Acids, the Most Widely Used Anti-aging Agents - PMC</a></li>
                                </ul>
                                <br></br>
                                <p>Glycerin and Hyaluronic Acid</p>
                                <ul>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9205919/">Moisture retention of glycerin solutions with various concentrations: a comparative study - PMC</a></li>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3583886/">Hyaluronic acid: A key molecule in skin aging - PMC</a></li>
                                </ul>
                                <br></br>
                                <p>Sunscreen</p>
                                <ul>
                                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7759112/">The efficacy and safety of sunscreen use for the prevention of skin cancer - PMC</a></li>
                                </ul>
                                <button className = 'close-modal' onClick={toggleModal2}>X</button>   
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