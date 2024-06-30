import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, coleccionFirebase } from "../../firebase/config";
import Item from "../Item/Item";
import Paginador from "../Paginador/Paginador";
import './filters.css';
import BarLoader from "react-spinners/BarLoader";


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
                const productosRef = collection(db, coleccionFirebase);
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
            const productosRef = collection(db, coleccionFirebase);
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
                    {/* <div className="ordenPrecio">
                        <select name="selectPrecio" onChange={handleOrdenChange} defaultValue="">
                            <option value="" disabled hidden>Ordenar por:</option>
                            <option value="menorPrecio">Menor precio</option>
                            <option value="mayorPrecio">Mayor precio</option>
                        </select>
                    </div> */}
                    <div className="buscar-btn">
                        <button type="submit">BUSCAR</button>
                    </div>
                </form>
            </div>
            <div className="productos">
                {currentProducts.length === 0 ? (
                    <div className="barLoader">
                        <BarLoader
                        color="#edb300"
                        cssOverride={{}}
                        height={4}
                        loading
                        speedMultiplier={2}
                        width={400}
                        />
                    </div>
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
 