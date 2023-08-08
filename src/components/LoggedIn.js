import { getFirestore, collection, getDocs} from "firebase/firestore";
import React, { useState, useEffect } from "react"
import  { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"
import { Avatar } from '@mui/material';



export const LoggedIn = () => {
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

    const handleSubmit = () => {
        const img = ref(storage, "image")
        uploadBytes(img, image).then(() => {
            getDownloadURL(img).then((url)=> {
                setURL(url);
            }).catch(error => {
                console.log(error.message, "error getting image")
            });
            setImage(null);
        }).catch((error => {
            console.log(error.message)
        }));
    };

    

    getDocs(colRef).then((snapshot) =>{
        let results = []
        snapshot.docs.forEach((result) => {
            results.push({...result.data(), id: result.id})
        })
    }).catch(err =>{
        console.log(err.message)
    })

    useEffect(()=> {
        const quizRe = async () => {
            const data = await getDocs(colRef)
            setQuizR(data.docs.map((doc, i) => ({...doc.data(), id: doc.id})))
        }; 
        quizRe();
    }, [colRef])
    return(
        <div>
            <Avatar style = {{left: 80}}
                alt = "Remy Sharp"
                src = {url}
                sx = {{width: 150, height: 150}}
            />
            <br>
            </br>
            <input style = {{left:80}}type = "file" onChange = {handleImageChange}/> 
            <br>
            </br>
            <button onClick = {handleSubmit}>Submit</button>
        </div>
    );

}