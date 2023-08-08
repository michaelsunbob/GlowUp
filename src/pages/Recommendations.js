import React, { useState, useEffect } from 'react'
import ProductRecommendations from '../components/ProductRecommendations'
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

const Recommendations = () => {
  const [User, setUser] = useState(null);

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
    <div>
      {User ? (
        <ProductRecommendations />
      ) : (
        <div >
            <h2>Product Recommendations</h2>
          <p>To view products tailored for you, <Link to="/register"> sign up </Link>and take our quiz!</p>
        </div>
      )}
    </div>
  )
}

export default Recommendations
