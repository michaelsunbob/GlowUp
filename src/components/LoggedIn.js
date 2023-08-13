import { getFirestore, collection, getDocs} from "firebase/firestore";
import React, { useState, useEffect } from "react"
import  { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"
import { Avatar } from '@mui/material';
import "../styles/LoggedIn.css"
import "../assets/Avatar.png"
import { onAuthStateChanged, updateCurrentUser } from "@firebase/auth";
import { auth } from "../firebase"
import {upload} from "../firebase"


export const LoggedIn = () => {
    function useAuth() {
        const [currentUser, setCurrentUser] = useState();
        useEffect(()=> {
            const u = onAuthStateChanged(auth, user => setCurrentUser(user));
            return u
        }, [])
        return currentUser
    }
    const currentUser = useAuth();
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png");
    const [photo, setPhoto] =useState(null);
    const [loading, setLoading] = useState(false);

    const [quizR, setQuizR] = useState([]);
    const db = getFirestore()
    const colRef = collection(db, "quizResults")

    const [image, setImage] = useState(null)
    const [url, setURL] = useState(null)

    const handleImageChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }

    };

    function handleChange(e) {
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }

    function handleClick() {
        upload(photo, currentUser,setLoading );
    }

    useEffect(() => {
        if(currentUser && currentUser.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
        
    }, [currentUser])

    

    getDocs(colRef).then((snapshot) =>{
        let results = []
        snapshot.docs.forEach((result) => {
            results.push({...result.data(), id: result.id})
        })
    }).catch(err =>{
        console.log(err.message)
    })
    return(
        <div>
            <img src = {photoURL}alt = "Avatar" className = "Avatar"/>
            <input type = "file" onChange = {handleChange}/>
            <button disabled = {loading || !photo} onClick = {handleClick}>Submit</button>
        </div>
    );

}