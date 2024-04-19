import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Item from "../Item/Item";
import './filters.css';

const Filters = () => {
    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const marcaParam = useParams().marca;

    useEffect(() => {
        const productosRef = collection(db, "productsListPrueba");
        const q = marcaParam ? query(productosRef, where("marca", "==", marcaParam)) : productosRef;

        getDocs(q)
            .then((resp) => {
                const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                const marcasUnicas = [...new Set(productosData.map((producto) => producto.marca))];
                setMarcas(marcasUnicas);

                // Si hay una marca seleccionada, filtrar los productos
                if (marcaSeleccionada) {
                    const productosFiltrados = productosData.filter(producto => producto.marca === marcaSeleccionada);
                    setProductosFiltrados(productosFiltrados);
                } else {
                    setProductosFiltrados(productosData);
                }
            })
            .catch((error) => {
                console.error("Error obteniendo productos:", error);
            });
    }, [marcaParam, marcaSeleccionada]);

    const handleMarcaChange = (event) => {
        setMarcaSeleccionada(event.target.value);
    };

    return (
        <div className="Filters">
            <div className='filtro'>
                <div className='text'>
                    <p>FILTRAR POR</p>
                </div>
                <form id="filtroBusqueda">
                    <div className="ordenMarca">
                        <select
                            name="selectMarca"
                            defaultValue=""
                            className="selectMarca"
                            onChange={handleMarcaChange}
                        >
                            <option value="" disabled hidden>Marca:</option>
                            {marcas.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                            ))}
                        </select>
                    </div>
                    <div className="ordenPrecio">
                        <select name="selectPrecio" defaultValue="">
                            <option value="" disabled hidden>Ordenar por:</option>
                            <option value="menorPrecio">Menor precio</option>
                            <option value="mayorPrecio">Mayor precio</option>
                        </select>
                    </div>
                    <div className="buscar-btn">
                        <input type="submit" value="BUSCAR" />
                    </div>
                </form>
            </div>
            <div className="productos">
                {productosFiltrados.map((producto) => (
                    <Item key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    )
}

export default Filters;