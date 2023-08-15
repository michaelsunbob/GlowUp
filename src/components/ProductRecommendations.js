import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { auth } from '../firebase'
import {
  getFirestore, collection, query,
  where, onSnapshot
} from 'firebase/firestore'
import '../styles/recommendations.css'
import { stepClasses } from '@mui/material'


const ProductRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [User, setUser] = useState(null)

  const db = getFirestore()
  const colRef = collection(db, 'quizResults')

  useEffect(() => {
    if (auth.currentUser != null) {
      setUser(auth.currentUser.uid)
      const q = query(colRef, where("userId", "==", auth.currentUser.uid))

      let templist

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          templist = doc.data().recommendedProducts
        })

        setRecommendedProducts(templist)
        console.log(recommendedProducts)
      })

      return () => unsubscribe()
    }
  }, [])


  return (
    <div>
      {User ? (
        recommendedProducts != null ? (
          <div className="product-container">
            <h1 className="title">Recommended Products</h1>
            <ul className="list">
              {recommendedProducts.map((product, index) => (
                <li key={index} className="item" >
                  <div>
                    <img className="image" src={product.image} alt={product.name} />
                    <h4 className="name">{product.name}</h4>
                  </div>
                </li>
              ))}
            </ul>
            <br></br>
            <p className='bottom-text'>If your skin goals change, you can always retake our <Link style = {{ color: "#000" }} to ="/quiz">quiz</Link></p>
          </div>
        ) : (
          <div>
            <h2>Product Recommendations</h2>
            <p className="text"> To discover products tailored for your skin type and concerns, <Link style={{ color: "#000" }} to="/quiz">take our quiz!</Link></p>

          </div>
        )
      ) : (
        <div>
          <h2>Product Recommendations</h2>
          <p className="text">To view products tailored for you, <Link style={{ color: "#000" }} to="/register">sign up</Link> and take our quiz!</p>
        </div>
      )}
    </div>
  )
}

export default ProductRecommendations