import React from 'react'
import { Link } from 'react-router-dom'

const Item = ( {producto} ) => {
  return (
    <div className="producto">
        <img src={producto.imagen} alt={producto.titulo} />
        <div>
        <Link className="nameProduct" to={`/item/${producto.id}`}>
          <h4 >{producto.titulo}</h4>
        </Link>
        <hr />
          <p className="Marca">{producto.marca}</p>
          <p className="precio">${producto.precio}</p>  
        </div>
    </div>
  )
}

export default Item