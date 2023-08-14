import React, { useState, useEffect } from 'react'
import ProductRecommendations from '../components/ProductRecommendations'
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"


const Recommendations = () => {
  /*
  const [User, setUser] = useState(null)
  const [TakenQuiz, setTakenQuiz] = useState(false)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, "quizResults", user.uid)
        const docSnap = await getDoc(userDocRef)
        setTakenQuiz(docSnap.exists())
      }
    })

    return () => {
      listen()
    }
  }, [])
  */

  return (
    <div>
      <ProductRecommendations />
    </div>
  )
}

export default Recommendations
