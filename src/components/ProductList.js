import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const ProductList = ({ task, deleteProductList, editProductList, toggleView }) => {

  return (
    <div className="productlist">
      <p className={`${task.view ? 'view' : ""}`} onClick={() => toggleView(task.id)}>{task.task}</p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editProductList(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteProductList(task.id)} />
      </div>
    </div>
  )
}