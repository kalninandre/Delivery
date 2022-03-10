import React, { Fragment } from 'react'

import images from '../../Constants/index.js'
import './Header.css';
import HeaderButton from './HeaderButton';

export default function Header ({ showCartHandler }) {
  return (
    <Fragment>
        <header className='header'>
            <h1>Gerítch</h1>
            <HeaderButton showCartHandler={showCartHandler}/>
        </header>

        <div className='main-image'>
            <img src={images.meals} alt='meals'/>
        </div>
    </Fragment>
  )
}
