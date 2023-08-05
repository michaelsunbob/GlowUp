import React, { useState, useEffect } from "react"
import { ProductList } from "./ProductList"
import { EditProductList } from "./EditProductList"
import { ProductListForm } from "./ProductListForm"
import { v4 as uuidv4 } from "uuid"
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth'
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore"

export const AllProductList = () => {
  const [productlists, setProductlists] = useState([])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user.uid)
    } else {
      console.log('User is signed out')
    }
  })

  const db = getFirestore()
  const colRef = collection(db, 'productlists')

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      let templist = []
      snapshot.docs.forEach((doc) => {
        templist.push({ ...doc.data(), id: doc.id })
      })
      setProductlists(templist)
    })

    return () => unsubscribe()
  }, [])

  const addProductList = (productlist) => {
    addDoc(colRef, {
      id: uuidv4(), task: productlist, view: false, isEditing: false
    })
  }

  const deleteProductList = (id) => {
    const docRef = doc(db, 'productlists', id)
    deleteDoc(docRef)
  }

  const toggleView = (id) => {
    setProductlists(
      productlists.map((productlist) =>
        productlist.id === id ? { ...productlist, view: !productlist.view } : productlist
      )
    )
  }

  const editProductList = (id) => {
    const docRef = doc(db, 'productlists', id)

    productlists.map((productlist) =>
      productlist.id === id ? (productlist.isEditing === true ? updateDoc(docRef, { isEditing: false }) : updateDoc(docRef, { isEditing: true })) 
      : updateDoc(docRef, { id: id})
    )
  }

  const editList = (task, id) => {
    const docRef = doc(db, 'productlists', id)

    productlists.map((productlist) =>
    productlist.id === id ? updateDoc(docRef, { task: task, isEditing: false}) : updateDoc(docRef, { task: task })
    )
  }

  return (
    <div className="productlistwrapper">
      <h1>Your Product Lists</h1>
      <ProductListForm addProductList={addProductList} />
      {productlists.map((todo) =>
        todo.isEditing ? (
          <EditProductList editProductList={editList} task={todo} />
        ) : (
          <ProductList
            key={todo.id}
            task={todo}
            deleteProductList={deleteProductList}
            editProductList={editProductList}
            toggleView={toggleView}
          />
        )
      )}
    </div>
  );
};