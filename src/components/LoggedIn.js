import { getFirestore, collection, getDocs} from "firebase/firestore";
import React, { useState, useEffect } from "react"



export const LoggedIn = () => {
    const [quizR, setQuizR] = useState([]);
    const db = getFirestore()
    const colRef = collection(db, "quizResults")
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
            {quizR.map((quiz) => {
                return (
                    <div>
                        <h1 style={{ textDecoration: 'none', color:'black' }}>Id: {quiz.userId} </h1> 
                        <h1 style={{ textDecoration: 'none', color:'black' }}>Recommended: {quiz.recommendedProducts}</h1>
                    </div>
                );    
            })}

            <p>{`Signed in`}</p>
        </div>
        

    );
}