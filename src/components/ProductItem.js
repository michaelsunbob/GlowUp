import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const ProductItem = ({ task, deleteProductItem, editProductItem }) => {

    return (
        <div className="productlist">
            <p>{task.task}</p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => editProductItem(task.id)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteProductItem(task.id)} />
            </div>
        </div>
    )
}