import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect } from "react"
import  AuthUser  from "../components/AuthUser"
import { auth } from "../firebase";
import { Login } from "../components/Login"


export default function Products() {
    useEffect(()=> {
        auth.onAuthStateChanged (user => {
            if(user){
                return <AuthUser/>
            }else{
                return <Login/>
            }
        })
    })    
    return <AuthUser />
}