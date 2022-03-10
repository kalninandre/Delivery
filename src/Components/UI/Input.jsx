import React from 'react'

import './Input.css'

const Input = React.forwardRef((props, ref) => {
  return (
    <div className='input'>
        <label htmlFor={props.id}>{props.description}</label>
        <input ref={ref} {...props.input}/>
    </div>
  )
})

export default Input