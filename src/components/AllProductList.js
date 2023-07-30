import React, { useState } from "react"
import { ProductList } from "./ProductList"
import { EditProductList } from "./EditProductList"
import { ProductListForm } from "./ProductListForm"
import { v4 as uuidv4 } from "uuid"

export const AllProductList = () => {
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