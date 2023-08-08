import React, { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth } from '../firebase'


const ProductRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([])
  
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