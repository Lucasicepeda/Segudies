import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';
import atrasBtn from "../assets/atrasBtn.svg"

const Carrito = () => {

    const { carrito, cantidadEnCarrito, vaciarCarrito } = useContext(CartContext);

    const handleVaciar = () => {
        vaciarCarrito();
    }

  return (
    <>
        <Link to="/"><img className="atras-btn" src={atrasBtn} alt="atras"/></Link>    
    <div className="container container-carrito">

        <h1 className="main-title">Carrito</h1>

        {
            carrito.map((prod) => (
                <div className="itemsCarrito" key={prod.id}>
                    <img className="imgItemCarrito" src={prod.images[0]} alt="prod.imagen"/>
                    <div className="infoItemCarrito">
                        <h3>{prod.titulo}</h3>
                        {/* <p>Precio unitario:  ${prod.precio}</p>
                        <p>Precio total:  ${prod.precio * prod.cantidad}</p> */}
                        <p>Cantidad: {prod.cantidad}</p>
                    </div>
                </div>
            ))
        }

        {  
            carrito.length > 0 ?
            <>
                <h3 className='precioTotal'>Cantidad de productos: {cantidadEnCarrito()}</h3>
                <div className='btnsComprar'>
                    <button onClick={handleVaciar} className='btn-vaciar'>Vaciar</button>
                    <Link to="/checkout"><button className='btn-finalizar-compra'>Finalizar compra</button></Link>
                </div>
            </> :
            <h2 className='carritoVacio'>El carrito está vacío :(</h2>
        }
        
    </div>
    </>
  )
}

export default Carrito