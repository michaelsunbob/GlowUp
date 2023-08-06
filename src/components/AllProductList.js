import React, { useState, useEffect } from "react"
import { ProductList } from "./ProductList"
import { ProductItem } from "./ProductItem"
import { EditProductList } from "./EditProductList"
import { ProductListForm } from "./ProductListForm"
import { ProductItemForm } from "./ProductItemForm"
import { v4 as uuidv4 } from "uuid"
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth'
import {
  getFirestore, collection,
  addDoc, deleteDoc, doc,
  updateDoc, onSnapshot, query, where
} from "firebase/firestore"

export const AllProductList = () => {
  const [productlists, setProductlists] = useState([])
  const [productitems, setProductitems] = useState([])
  const [currentid, setCurrentid] = useState('')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user.uid)
    } else {
      console.log('User is signed out')
    }
  })

  const db = getFirestore()
  const colRef = collection(db, 'productlists')
  const colRef2 = collection(db, 'productitems')

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

  const addProductItem = (productitem) => {
    if (currentid != "") {
      addDoc(colRef2, {
        id: currentid, task: productitem, isEditing: false
      })
    }
  }

  const deleteProductList = (id) => {
    const docRef = doc(db, 'productlists', id)
    deleteDoc(docRef)
  }

  const deleteProductItem = (id) => {
    const docRef = doc(db, 'productitems', id)
    deleteDoc(docRef)
  }

  const editProductList = (id) => {
    const docRef = doc(db, 'productlists', id)

    productlists.map((productlist) =>
      productlist.id === id ? (productlist.isEditing === true ? updateDoc(docRef, { isEditing: false }) : updateDoc(docRef, { isEditing: true }))
        : updateDoc(docRef, { id: id })
    )
  }

  const editProductItem = (id) => {
    const docRef = doc(db, 'productitems', id)

    productitems.map((productitem) =>
      productitem.id === id ? (productitem.isEditing === true ? updateDoc(docRef, { isEditing: false }) : updateDoc(docRef, { isEditing: true }))
        : updateDoc(docRef, { id: currentid })
    )
  }

  const editList = (task, id) => {
    const docRef = doc(db, 'productlists', id)

    productlists.map((productlist) =>
      productlist.id === id ? updateDoc(docRef, { task: task, isEditing: false }) : updateDoc(docRef, { task: task })
    )
  }

  const editProduct = (task, id) => {
    const docRef = doc(db, 'productitems', id)

    productitems.map((productitem) =>
      productitem.id === id ? updateDoc(docRef, { task: task, isEditing: false }) : updateDoc(docRef, { task: task })
    )
  }

  const toggleView = (id) => {
    const q = query(colRef2, where("id", "==", id))
    setCurrentid(id)

    onSnapshot(q, (snapshot) => {
      let templist = []
      snapshot.docs.forEach((doc) => {
        templist.push({ ...doc.data(), id: doc.id })
      })
      setProductitems(templist)
      console.log(productitems)
    })
  }

  return (
    <div className="productlistwrapper">
      <div className="comp1">
        <h1>Your Product Lists</h1>
        <ProductListForm addProductList={addProductList} />
        {productlists.map((product) =>
          product.isEditing ? (
            <EditProductList editProductList={editList} task={product} />
          ) : (
            <ProductList
              key={product.id}
              task={product}
              deleteProductList={deleteProductList}
              editProductList={editProductList}
              toggleView={toggleView}
            />
          )
        )}
      </div>
      <div className="comp2">
        <h1>Your Product Items</h1>
        <ProductItemForm addProductItem={addProductItem} />
        {productitems.map((product) =>
          product.isEditing ? (
            <EditProductList editProductList={editProduct} task={product} />
          ) : (
            <ProductItem
              key={product.id}
              task={product}
              deleteProductItem={deleteProductItem}
              editProductItem={editProductItem}
            />
          )
        )}
      </div>
    </div>
  )
}