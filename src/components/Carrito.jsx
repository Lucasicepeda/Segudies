import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';

const Carrito = () => {

    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

    const handleVaciar = () => {
        vaciarCarrito();
    }

  return (
    <div className="container container-carrito">
        <h1 className="main-title">Carrito</h1>

        {
            carrito.map((prod) => (
                <div className="itemsCarrito" key={prod.id}>
                    <img className="imgItemCarrito" src={prod.imagen} alt="prod.imagen"/>
                    <div className="infoItemCarrito">
                        <h3>{prod.titulo}</h3>
                        <p>Precio unit: ${prod.precio}</p>
                        <p>Precio total: ${prod.precio * prod.cantidad}</p>
                        <p>Cant: {prod.cantidad}</p>
                    </div>
                </div>
            ))
        }

        {  
            carrito.length > 0 ?
            <>
                <h2>Precio total: ${precioTotal()}</h2>
                <div className='btnsComprar'>
                    <button onClick={handleVaciar}>Vaciar</button>
                    <Link to="/checkout"><button>Finalizar compra</button></Link>
                </div>
            </> :
            <h2>El carrito está vacío :(</h2>
        }
        
    </div>
  )
}

export default Carrito