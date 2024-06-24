// import { useContext, useState } from "react";
// import { toCapital } from "../../helpers/toCapital";
// import ItemCount from "./ItemCount";
// import { CartContext } from "../../context/CartContext";
// import chevronLeft from "../../assets/chevron-left.svg";
// import chevronRight from "../../assets/chevron-right.svg";
// import "./itemDetail.css";

// const ItemDetail = ({ item }) => {
//   const { agregarAlCarrito } = useContext(CartContext);

//   const [cantidad, setCantidad] = useState(1);
//   const [imagenIndex, setImagenIndex] = useState(0);

//   const handleRestar = () => {
//     cantidad > 1 && setCantidad(cantidad - 1);
//   };

//   const handleSumar = () => {
//     setCantidad(cantidad + 1);
//   };

//   const mostrarSiguienteImagen = () => {
//     setImagenIndex((imagenIndex + 1) % item.images.length);
//   };

//   const mostrarImagenAnterior = () => {
//     setImagenIndex((imagenIndex - 1 + item.images.length) % item.images.length);
//   };

//   return (
//     <div className="producto-detalle">
//       <div className="imagenes-container">
//         {Object.values(item.images).map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`imagen-${index}`}
//             className={index === imagenIndex ? "imagen-visible" : "no-image"}
//           />
//         ))}
//         <div className="botones-container">
//           <button className="boton" onClick={mostrarImagenAnterior}>
//             <img src={chevronLeft} alt="Anterior" />
//           </button>
//           <button className="boton" onClick={mostrarSiguienteImagen}>
//             <img src={chevronRight} alt="Siguiente" />
//           </button>
//         </div>
//       </div>
//       <div>
//         <h3 className="titulo">{item.titulo}</h3>
//         <div className="producto-detalle-container">
//           <div className="detalles-container">
//             {item.descripcion && (
//               <p className="descripcion">{item.descripcion}</p>
//             )}
//             {item.marca && (
//               <p className="marca">Marca: {toCapital(item.marca)}</p>
//             )}
//             {item.codigo && <p className="codigo">Codigo: {item.codigo}</p>}
//             {item.iva && <p className="iva">IVA: {item.iva}</p>}
//             {item.material && (
//               <p className="material">Material: {item.material}</p>
//             )}
//             {item.unidxcaja && (
//               <p className="UnidxCaja">Unidades x caja: {item.unidxcaja}</p>
//             )}
//             <div className="desplegables-itemDetail">
//               {item.largos && item.largos.length > 0 && (
//                 <div className="largos">
//                   <p>Largos disponibles:</p>
//                   <select
//                     name="selectLargo"
//                     className="desplegable-largos"
//                     defaultValue=""
//                   >
//                     {Object.values(item.largos).map((largos, index) => (
//                       <option key={index} value={largos}>
//                         {largos}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {item.medidas && item.medidas.length > 0 && (
//                 <div className="medidas">
//                   <p>Medidas disponibles:</p>
//                   <select
//                     name="selectMedida"
//                     className="desplegable-medidas"
//                     defaultValue=""
//                   >
//                     {Object.values(item.medidas).map((medidas, index) => (
//                       <option key={index} value={medidas}>
//                         {medidas}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="item-count-container">
//         <ItemCount
//           cantidad={cantidad}
//           handleSumar={handleSumar}
//           handleRestar={handleRestar}
//           handleAgregar={() => {
//             agregarAlCarrito(item, cantidad);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ItemDetail;

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
    // if (item.largos && (selectedLargo === null || selectedLargo === "")) {
    //   alert("Por favor selecciona un largo.");
    //   return;
    // }
    // if (item.medidas && (selectedMedida === null || selectedMedida === "")) {
    //   alert("Por favor selecciona una medida.");
    //   return;
    // }

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
              <p className="marca">Marca: {toCapital(item.marca)}</p>
            )}
            {item.codigo && <p className="codigo">Codigo: {item.codigo}</p>}
            {item.iva && <p className="iva">IVA: {item.iva}</p>}
            {item.material && (
              <p className="material">Material: {item.material}</p>
            )}
            {item.unidxcaja && (
              <p className="UnidxCaja">Unidades x caja: {item.unidxcaja}</p>
            )}
            <div className="desplegables-itemDetail">
              {item.largos && item.largos.length > 0 && (
                <div className="largos">
                  <p>Largos disponibles:</p>
                  <select
                    name="selectLargo"
                    className="desplegable-largos"
                    value={selectedLargo}
                    onChange={(e) => setSelectedLargo(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione un largo
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
                  <p>Medidas disponibles:</p>
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
          </div>
        </div>
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
  );
};

export default ItemDetail;
