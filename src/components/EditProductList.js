import React, { useState } from 'react'

export const EditProductList = ({ editProductList, task }) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = (e) => {
        e.preventDefault()
        editProductList(value, task.id)
    }
    
    return (
        <form onSubmit={handleSubmit} className="productlistform">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="productlist-input" placeholder='Update list' />
            <button type="submit" className='productlist-btn'>Add List</button>
        </form>
    )
}