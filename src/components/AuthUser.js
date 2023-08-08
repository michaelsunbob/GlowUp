import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {useState ,useEffect} from "react";
import { auth } from "../firebase";
import { Login } from "./Login"
import { LoggedIn } from "./LoggedIn";
import { Link } from "react-router-dom"

const AuthUser = () => {
    const [AuthUser, setAuthUser] = useState(null);

    useEffect(() =>{
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null);
            }
        });
            return () => {
                listen();
            }
    }, [])

        const authSignOut = () => {
            signOut(auth).then(()=> {
                console.log("Successfully signed out")
            }).catch((error) => console.log(error))
        }
    return (
        <div>
            {
            AuthUser ? 
            <><LoggedIn/>
            <br>
            </br>
            <h1 style={{color: '#A679CA' }}>WELCOME!</h1>
            <p style = {{color: '#B19CD8'}}>{`You are signed in as ${AuthUser.email}`}</p>
            <br>
            </br>
            <p style = {{color: '#B19CD8'}}>
                Take the quiz! <Link to="/quiz">Quiz Link</Link>
            </p>
            <br>
            </br>
            <button 
                onClick = {authSignOut}>Sign Out
            </button>
            </> : <Login/>
            }
        </div>
    )
}

export default AuthUser