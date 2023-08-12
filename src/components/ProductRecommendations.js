import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
  getFirestore, collection, query, 
  where, onSnapshot
} from 'firebase/firestore'
import '../styles/recommendations.css'


const ProductRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([])

  const db = getFirestore()
  const colRef = collection(db, 'quizResults')

  useEffect(() => {
    if (auth.currentUser != null) {
      const q = query(colRef, where("userId", "==", auth.currentUser.uid))

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setRecommendedProducts(doc.data().recommendedProducts)
        })
      })

      return () => unsubscribe()
    }
  }, [])


  return (
    <div className="product-container">
      <h1 className="title">Recommended Products</h1>
      <ul className="list">
      {recommendedProducts.map((product, index) => (
          <li key={index} className="item" >
            <div>
              <img  className="image" src={product.image} alt={product.name} />
              <h4 className="name">{product.name}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductRecommendations