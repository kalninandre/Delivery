import React, { Fragment } from 'react'
import reactDom from 'react-dom';

import './Modal.css'

const Backdrop = ({ showCartHandler }) => {
    return (
        <div className='backdrop' onClick={showCartHandler}></div>
    );
};

const ModalOverlay = (props) => {
  return (
    <div className='modal'>
        <div className='content'>{props.children}</div>
    </div>
  )
};

const portal = document.getElementById('overlay');

const Modal = ({ showCartHandler, children}) => {
  return (
    <Fragment>
       {reactDom.createPortal(<Backdrop showCartHandler={showCartHandler}/>, portal)}
       {reactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, portal)}
    </Fragment>
  )
}

export default Modal;