import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import Item from "../Item/Item";
import './filters.css';

const Filters = () => {
    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
    const [ordenSeleccionado, setOrdenSeleccionado] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const marcaParam = useParams().marca;

    useEffect(() => {
        const productosRef = collection(db, "productsListPrueba");
    
        getDocs(productosRef)
            .then((resp) => {
                const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                const marcasUnicas = [...new Set(productosData.map((producto) => producto.marca))];
                setMarcas(marcasUnicas);
                setProductosFiltrados(productosData); // Mostrar todos los productos al inicio
            })
            .catch((error) => {
                console.error("Error obteniendo productos:", error);
            });
    }, []);

    const handleMarcaChange = (event) => {
        setMarcaSeleccionada(event.target.value);
    };

    const handleOrdenChange = (event) => {
        setOrdenSeleccionado(event.target.value);
    };

    const handleBuscarClick = (event) => {
        event.preventDefault();
        
        const productosRef = collection(db, "productsListPrueba");
        let q = productosRef;

        if (marcaSeleccionada) {
            q = query(q, where("marca", "==", marcaSeleccionada));
        }

        getDocs(q)
            .then((resp) => {
                let productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                if (ordenSeleccionado === "menorPrecio") {
                    productosData.sort((a, b) => a.precio - b.precio);
                } else if (ordenSeleccionado === "mayorPrecio") {
                    productosData.sort((a, b) => b.precio - a.precio);
                }

                setProductosFiltrados(productosData);
            })
            .catch((error) => {
                console.error("Error obteniendo productos:", error);
            });
    };

    return (
        <div className="Filters">
            <div className='filtro'>
                {/* <div className='text'>
                    <p>FILTRAR POR</p>
                </div> */}
                <form id="filtroBusqueda" onSubmit={handleBuscarClick}>
                    <div className="ordenMarca">
                        <select
                            name="selectMarca"
                            defaultValue=""
                            className="selectMarca"
                            onChange={handleMarcaChange}
                        >
                            {/* <option value="" disabled hidden>Marca:</option> */}
                            <option value="">Todos</option>
                            {marcas.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                            ))}
                        </select>
                    </div>
                    <div className="ordenPrecio">
                        <select name="selectPrecio" defaultValue="" onChange={handleOrdenChange}>
                            <option value="" disabled hidden>Ordenar por:</option>
                            <option value="menorPrecio">Menor precio</option>
                            <option value="mayorPrecio">Mayor precio</option>
                        </select>
                    </div>
                    <div className="buscar-btn">
                        <button type="submit">BUSCAR</button>
                    </div>
                </form>
            </div>
            <div className="productos">
                {productosFiltrados.length === 0 ? (
                    <p>No existen productos de la marca {marcaSeleccionada}</p>
                ) : (
                    productosFiltrados.map((producto) => (
                        <Item key={producto.id} producto={producto} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Filters;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import Item from "../Item/Item";
// import './filters.css';

// const Filters = () => {
//     const [marcas, setMarcas] = useState([]);
//     const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
//     const [productosFiltrados, setProductosFiltrados] = useState([]);
//     const marcaParam = useParams().marca;

//     useEffect(() => {
//         const productosRef = collection(db, "productsListPrueba");
//         const q = marcaParam ? query(productosRef, where("marca", "==", marcaParam)) : productosRef;

//         getDocs(q)
//             .then((resp) => {
//                 const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//                 const marcasUnicas = [...new Set(productosData.map((producto) => producto.marca))];
//                 setMarcas(marcasUnicas);
//                 if (marcaSeleccionada) {
//                     const productosFiltrados = productosData.filter(producto => producto.marca === marcaSeleccionada);
//                     setProductosFiltrados(productosFiltrados);
//                 } else {
//                     setProductosFiltrados(productosData);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error obteniendo productos:", error);
//             });
//     }, [marcaParam, marcaSeleccionada]);

//     const handleMarcaChange = (event) => {
//         setMarcaSeleccionada(event.target.value);
//     };

//     return (
//         <div className="Filters">
//             <div className='filtro'>
//                 <div className='text'>
//                     <p>FILTRAR POR</p>
//                 </div>
//                 <form id="filtroBusqueda">
//                     <div className="ordenMarca">
//                         <select
//                             name="selectMarca"
//                             defaultValue=""
//                             className="selectMarca"
//                             onChange={handleMarcaChange}
//                         >
//                             <option value="" disabled hidden>Marca:</option>
//                             {marcas.map((marca, index) => (
//                                 <option key={index} value={marca}>{marca}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="ordenPrecio">
//                         <select name="selectPrecio" defaultValue="">
//                             <option value="" disabled hidden>Ordenar por:</option>
//                             <option value="menorPrecio">Menor precio</option>
//                             <option value="mayorPrecio">Mayor precio</option>
//                         </select>
//                     </div>
//                     <div className="buscar-btn">
//                         <input type="submit" value="BUSCAR" />
//                     </div>
//                 </form>
//             </div>
//             <div className="productos">
//                 {productosFiltrados.length === 0 ? (
//                     <p>No existen productos de la marca {marcaSeleccionada}</p>
//                 ) : (
//                     productosFiltrados.map((producto) => (
//                         <Item key={producto.id} producto={producto} />
//                     ))
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Filters;