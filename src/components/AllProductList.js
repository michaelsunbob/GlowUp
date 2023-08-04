import React, { useState } from "react"
import { ProductList } from "./ProductList"
import { EditProductList } from "./EditProductList"
import { ProductListForm } from "./ProductListForm"
import { v4 as uuidv4 } from "uuid"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

export const AllProductList = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCZzStYNtHWmNmXMyOKYebl4cPv2TN8kJo",
    authDomain: "react-550c0.firebaseapp.com",
    projectId: "react-550c0",
    storageBucket: "react-550c0.appspot.com",
    messagingSenderId: "646908889125",
    appId: "1:646908889125:web:a1af917b9a1883436917cc",
    measurementId: "G-LPJ8WQFLE0"
  }

  initializeApp(firebaseConfig)

  const db = getFirestore()

  const [productlists, setProductlists] = useState([])

  const addProductList = (productlist) => {
    setProductlists([
      ...productlists,
      { id: uuidv4(), task: productlist, view: false, isEditing: false },
    ])
  }

  const deleteProductList = (id) => {
    setProductlists(productlists.filter((productlist) => productlist.id !== id))
  }

  const toggleView = (id) => {
    setProductlists(
      productlists.map((productlist) =>
        productlist.id === id ? { ...productlist, view: !productlist.view } : productlist
      )
    )
  }

  const editProductList = (id) => {
    setProductlists(
      productlists.map((productlist) =>
        productlist.id === id ? { ...productlist, isEditing: !productlist.isEditing } : productlist
      )
    )
  }

  const editList = (task, id) => {
    setProductlists(
      productlists.map((productlist) =>
      productlist.id === id ? { ...productlist, task, isEditing: !productlist.isEditing } : productlist
      )
    );
  };

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