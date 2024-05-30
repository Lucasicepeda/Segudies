import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ producto }) => {
  return (
    <div className="producto">
      <Link className="nameProduct" to={`/item/${producto.id}`}>
        <img className="img-producto" src={producto.images[0]} alt={producto.titulo} />
      </Link>
      <div>
        <Link className="nameProduct" to={`/item/${producto.id}`}>
          <h4 >{producto.titulo}</h4>
        </Link>
        <hr />
        <p className="Marca">{producto.marca}</p>
        <p className="codigo">Codigo: {producto.codigo}</p>
      </div>
    </div>
  )
}

export default Item 