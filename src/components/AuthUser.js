import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {useState ,useEffect} from "react";
import { auth } from "../firebase";
import { Login } from "./Login"
import { LoggedIn } from "./LoggedIn";

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
            <button 
                onClick = {authSignOut}>Sign Out
            </button>
            </> : <Login/>
            }
        </div>
    )
}

export default AuthUser