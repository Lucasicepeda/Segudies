import { useContext, useState } from "react";
import { toCapital } from "../../helpers/toCapital"
import ItemCount from "./ItemCount"
import { CartContext } from "../../context/CartContext";
import './itemDetail.css'

const ItemDetail = ( {item} ) => {

    const { carrito, agregarAlCarrito } = useContext(CartContext);
    console.log(carrito);

    const [cantidad, setCantidad] = useState(1);

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
      setCantidad(cantidad + 1);
    }

  return (
    <div className="container">
        <div className="producto-detalle">
            <img src={item.imagen} alt={item.titulo} />
            <div className="producto-detalle-container">
              <div className="detalles-container">
                <h3 className="titulo">{item.titulo}</h3>
                <p className="descripcion">{item.descripcion}</p>
                <p className="marca">Marca: {toCapital(item.marca)}</p>
                <p className="precio">${item.precio}</p>
              </div>
                <ItemCount
                  cantidad={cantidad}
                  handleSumar={handleSumar}
                  handleRestar={handleRestar}
                  handleAgregar={() => { agregarAlCarrito(item, cantidad) }}
                />
            </div>
        </div>
    </div>
  )
}

export default ItemDetail