import React, { useState } from 'react'

export const ProductListForm = ({ addProductList }) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value) {
            addProductList(value)
            setValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="productlistform">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="productlist-input" placeholder='Enter new list name' />
            <button type="submit" className='productlist-btn'>New List</button>
        </form>
    )
}