import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
  getFirestore, collection, query, 
  where, onSnapshot
} from 'firebase/firestore'


const ProductRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([])

  /*
  const fetchProducts = async () => {
    const quizResults = doc(getFirestore(), 'quizResults', auth.currentUser.uid)

    try {
      const docSnapshot = await getDoc(quizResults)
      if (docSnapshot.exists()) {
        const data = docSnapshot.data()
        if (data.recommendedProducts) {
          setRecommendedProducts(data.recommendedProducts)
        }
      }
    }   catch (error) {
      console.error('Error fetching the products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  */

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
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {recommendedProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductRecommendations