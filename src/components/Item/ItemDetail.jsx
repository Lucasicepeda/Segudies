import { useContext, useState } from "react";
import { toCapital } from "../../helpers/toCapital";
import ItemCount from "./ItemCount";
import { CartContext } from "../../context/CartContext";
import chevronLeft from "../../assets/chevron-left.svg";
import chevronRight from "../../assets/chevron-right.svg";
import "./itemDetail.css";

const ItemDetail = ({ item }) => {
  const { agregarAlCarrito } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);
  const [imagenIndex, setImagenIndex] = useState(0);
  const [selectedLargo, setSelectedLargo] = useState("");
  const [selectedMedida, setSelectedMedida] = useState("");

  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const handleSumar = () => {
    setCantidad(cantidad + 1);
  };

  const mostrarSiguienteImagen = () => {
    setImagenIndex((imagenIndex + 1) % item.images.length);
  };

  const mostrarImagenAnterior = () => {
    setImagenIndex((imagenIndex - 1 + item.images.length) % item.images.length);
  };

  const handleAgregarAlCarrito = () => {
    const itemConSeleccion = {
      ...item,
      largos: item.largos ? selectedLargo : null,
      medidas: item.medidas ? selectedMedida : null
    };
    agregarAlCarrito(itemConSeleccion, cantidad);
  };

  return (
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
      <div>
        <h3 className="titulo">{item.titulo}</h3>
        <div className="producto-detalle-container">
          <div className="detalles-container">
            {item.descripcion && (
              <p className="descripcion">{item.descripcion}</p>
            )}
            {item.marca && (
              <p className="marca">
                <span className="detalle-titulo">Marca:</span> 
                <span className="detalle-valor">{toCapital(item.marca)}</span>
              </p>
            )}
            {item.codigo && (
              <p className="codigo">
                <span className="detalle-titulo">Código:</span> 
                <span className="detalle-valor">{item.codigo}</span>
              </p>
            )}
            {item.iva && (
              <p className="iva">
                <span className="detalle-titulo">IVA:</span> 
                <span className="detalle-valor">{item.iva}</span>
              </p>
            )}
            {item.material && (
              <p className="material">
                <span className="detalle-titulo">Material:</span> 
                <span className="detalle-valor">{item.material}</span>
              </p>
            )}
            {item.unidxcaja && (
              <p className="UnidxCaja">
                <span className="detalle-titulo">Unidades x caja:</span> 
                <span className="detalle-valor">{item.unidxcaja}</span>
              </p>
            )}
            <div className="desplegables-itemDetail">
              {item.largos && item.largos.length > 0 && (
                <div className="largos">
                  <span className="detalle-titulo">Largos disponibles:</span>
                  <select
                    name="selectLargo"
                    className="desplegable-largos"
                    value={selectedLargo}
                    onChange={(e) => setSelectedLargo(e.target.value)}
                  >
                    <option value="" disabled>
                      Largos disponibles
                    </option>
                    {Object.values(item.largos).map((largos, index) => (
                      <option key={index} value={largos}>
                        {largos}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {item.medidas && item.medidas.length > 0 && (
                <div className="medidas">
                  <span className="detalle-titulo">Medidas disponibles:</span>
                  <select
                    name="selectMedida"
                    className="desplegable-medidas"
                    value={selectedMedida}
                    onChange={(e) => setSelectedMedida(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione una medida
                    </option>
                    {Object.values(item.medidas).map((medidas, index) => (
                      <option key={index} value={medidas}>
                        {medidas}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
      <div className="item-count-container">
        <ItemCount
          cantidad={cantidad}
          handleSumar={handleSumar}
          handleRestar={handleRestar}
          handleAgregar={handleAgregarAlCarrito}
          />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
