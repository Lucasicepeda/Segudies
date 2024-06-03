// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import Item from "../Item/Item";
// import Paginador from "../Paginador/Paginador";
// import './filters.css';

// const Filters = () => {
//     const [marcas, setMarcas] = useState([]);
//     const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
//     const [ordenSeleccionado, setOrdenSeleccionado] = useState("");
//     const [productosFiltrados, setProductosFiltrados] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage] = useState(8);

//     useEffect(() => {
//         const productosRef = collection(db, "productsListPrueba");

//         getDocs(productosRef)
//             .then((resp) => {
//                 const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//                 const marcasUnicas = [...new Set(productosData.map((producto) => producto.marca))];
//                 setMarcas(marcasUnicas);
//                 setProductosFiltrados(productosData);
//             })
//             .catch((error) => {
//                 console.error("Error obteniendo productos:", error);
//             });
//     }, []);

//     const handleMarcaChange = (event) => {
//         setMarcaSeleccionada(event.target.value);
//     };

//     const handleOrdenChange = (event) => {
//         setOrdenSeleccionado(event.target.value);
//     };

//     const handleBuscarClick = (event) => {
//         event.preventDefault();

//         const productosRef = collection(db, "productsListPrueba");
//         let q = productosRef;

//         if (marcaSeleccionada) {
//             q = query(q, where("marca", "==", marcaSeleccionada));
//         }

//         getDocs(q)
//             .then((resp) => {
//                 let productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

//                 if (ordenSeleccionado === "menorPrecio") {
//                     productosData.sort((a, b) => a.precio - b.precio);
//                 } else if (ordenSeleccionado === "mayorPrecio") {
//                     productosData.sort((a, b) => b.precio - a.precio);
//                 }

//                 setProductosFiltrados(productosData);
//                 setCurrentPage(1); // Resetear a la primera página después de cada búsqueda
//             })
//             .catch((error) => {
//                 console.error("Error obteniendo productos:", error);
//             });
//     };

//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className="Filters">
//             <div className='filtro'>
//                 <form id="filtroBusqueda" onSubmit={handleBuscarClick}>
//                     <div className="ordenMarca">
//                         <select
//                             name="selectMarca"
//                             defaultValue=""
//                             className="selectMarca"
//                             onChange={handleMarcaChange}
//                         >
//                             <option value="">Todos</option>
//                             {marcas.map((marca, index) => (
//                                 <option key={index} value={marca}>{marca}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="ordenPrecio">
//                         <select name="selectPrecio" defaultValue="" onChange={handleOrdenChange}>
//                             <option value="" disabled hidden>Ordenar por:</option>
//                             <option value="menorPrecio">Menor precio</option>
//                             <option value="mayorPrecio">Mayor precio</option>
//                         </select>
//                     </div>
//                     <div className="buscar-btn">
//                         <button type="submit">BUSCAR</button>
//                     </div>
//                 </form>
//             </div>
//             <div className="productos">
//                 {currentProducts.length === 0 ? (
//                     <p>No existen productos de la marca {marcaSeleccionada}</p>
//                 ) : (
//                     currentProducts.map((producto) => (
//                         <Item key={producto.id} producto={producto} />
//                     ))
//                 )}
//             </div>
//             {productosFiltrados.length > productsPerPage && (
//                 <Paginador
//                     productosFiltrados={productosFiltrados}
//                     productsPerPage={productsPerPage}
//                     currentPage={currentPage}
//                     paginate={paginate}
//                 />
//             )}
//         </div>
//     );
// };

// export default Filters;

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Item from "../Item/Item";
import Paginador from "../Paginador/Paginador";
import './filters.css';

const Filters = () => {
    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
    const [ordenSeleccionado, setOrdenSeleccionado] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosRef = collection(db, "productsListPrueba");
                const resp = await getDocs(productosRef);
                const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                const marcasUnicas = [...new Set(productosData.map((producto) => producto.marca))];
                setMarcas(marcasUnicas);
                setProductosFiltrados(productosData);
            } catch (error) {
                console.error("Error obteniendo productos:", error);
            }
        };

        fetchProductos();
    }, []);

    const handleMarcaChange = (event) => setMarcaSeleccionada(event.target.value);
    const handleOrdenChange = (event) => setOrdenSeleccionado(event.target.value);

    const handleBuscarClick = async (event) => {
        event.preventDefault();

        try {
            const productosRef = collection(db, "productsListPrueba");
            let q = marcaSeleccionada ? query(productosRef, where("marca", "==", marcaSeleccionada)) : productosRef;
            const resp = await getDocs(q);
            let productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            if (ordenSeleccionado) {
                const sortOrder = ordenSeleccionado === "menorPrecio" ? 1 : -1;
                productosData.sort((a, b) => (a.precio - b.precio) * sortOrder);
            }

            setProductosFiltrados(productosData);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error obteniendo productos:", error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = productosFiltrados.slice(indexOfLastProduct - productsPerPage, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="Filters">
            <div className='filtro'>
                <form id="filtroBusqueda" onSubmit={handleBuscarClick}>
                    <div className="ordenMarca">
                        <select name="selectMarca" className="selectMarca" onChange={handleMarcaChange} defaultValue="">
                            <option value="">Todos</option>
                            {marcas.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                            ))}
                        </select>
                    </div>
                    <div className="ordenPrecio">
                        <select name="selectPrecio" onChange={handleOrdenChange} defaultValue="">
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
                {currentProducts.length === 0 ? (
                    <p>No existen productos de la marca {marcaSeleccionada}</p>
                ) : (
                    currentProducts.map((producto) => <Item key={producto.id} producto={producto} />)
                )}
            </div>
            {productosFiltrados.length > productsPerPage && (
                <Paginador
                    productosFiltrados={productosFiltrados}
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

export default Filters;
 