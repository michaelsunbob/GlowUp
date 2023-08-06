import React, { useState } from 'react'

export const ProductItemForm = ({ addProductItem }) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value) {
            addProductItem(value)
            setValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="productlistform">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="productlist-input" placeholder='Enter new item name' />
            <button type="submit" className='productlist-btn'>New Item</button>
        </form>
    )
}