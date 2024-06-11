import { useContext, useState } from "react";
import { toCapital } from "../../helpers/toCapital"
import ItemCount from "./ItemCount"
import { CartContext } from "../../context/CartContext"
import chevronLeft from "../../assets/chevron-left.svg"
import chevronRight from "../../assets/chevron-right.svg"
import './itemDetail.css' 

const ItemDetail = ({ item }) => {

  const { carrito, agregarAlCarrito } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);
  const [imagenIndex, setImagenIndex] = useState(0);

  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1)
  }

  const handleSumar = () => {
    setCantidad(cantidad + 1);
  }

  const mostrarSiguienteImagen = () => {
    setImagenIndex((imagenIndex + 1) % item.images.length);
  }

  const mostrarImagenAnterior = () => {
    setImagenIndex((imagenIndex - 1 + item.images.length) % item.images.length);
  }

  return (
    <div className="container">
      <div className="producto-detalle">
        <div className="imagenes-container">
        {Object.values(item.images).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`imagen-${index}`}
              className={index === imagenIndex ? "imagen-visible" : "no-image"}
            />
          ))}
          <div className="botones-container">
            <button className="boton" onClick={mostrarImagenAnterior}>
              <img src={chevronLeft} alt="Anterior" />
            </button>
            <button className="boton" onClick={mostrarSiguienteImagen}>
              <img src={chevronRight} alt="Siguiente" />
            </button>
          </div>
        </div>
        <div className="producto-detalle-container">
          <div className="detalles-container">
            <h3 className="titulo">{item.titulo}</h3>
            <p className="descripcion">{item.descripcion}</p>
            <p className="marca">Marca: {toCapital(item.marca)}</p>
            <p className="codigo">Codigo: {item.codigo}</p>
            <p className="iva">Iva: {item.iva}</p>
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