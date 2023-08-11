import React, { useState } from 'react'

export const RoutineForm = ({ addTask }) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value) {
            addTask(value)
            setValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="productlistform">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="productlist-input" placeholder='Enter new task' />
            <button type="submit" className='productlist-btn'>New Task</button>
        </form>
    )
}