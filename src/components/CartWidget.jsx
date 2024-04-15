import './Header/header.css';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import carrito from '../assets/shopping-cart.svg'

const CartWidget = () => {

  const { cantidadEnCarrito } = useContext(CartContext);

  return (
    <div>
      <Link className="menu-link" to="/carrito">
        <img src={carrito} alt="carrito"/>
        <span className="numerito"> {cantidadEnCarrito()}</span>
      </Link>
    </div>
  )
}

export default CartWidget