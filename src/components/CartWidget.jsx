import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext';

const CartWidget = () => {

    const { cantidadEnCarrito } = useContext(CartContext);

  return (
    <div>
        <Link className="menu-link" to="/carrito">
        <img src="src/assets/shopping-cart-outline-svgrepo-com.svg" alt="" style={{ width: "25px", fill: "white" }}/>

        <span className="numerito"> {cantidadEnCarrito()}</span>
        </Link>
    </div>
  )
}

export default CartWidget