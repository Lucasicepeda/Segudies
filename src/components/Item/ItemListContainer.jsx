import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, coleccionFirebase } from "../../firebase/config";
import atrasBtn from "../../assets/atrasBtn.svg";
import Paginador from "../Paginador/Paginador.jsx";
import BarLoader from "react-spinners/BarLoader";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [titulo, setTitulo] = useState("Productos");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); 
    const marca = useParams().marca;

    useEffect(() => {
        const productosRef = collection(db, coleccionFirebase);
        const q = marca ? query(productosRef, where("marca", "==", marca)) : productosRef;

        getDocs(q)
            .then((resp) => {
                const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setProductos(productosData);
            })
            .catch((error) => {
                console.error("Error obteniendo productos:", error);
            });
    }, [marca]);

    // Obtener productos actuales
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Link to="/"><img className="atras-btn" src={atrasBtn} alt="atras"/></Link>   
            {productos.length === 0 ? (
                // <p className="notProduct">No existen productos de la marca {marca}</p>
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
                <>
                    <ItemList productos={currentProducts} titulo={titulo} />
                    <Paginador 
                        productosFiltrados={productos} 
                        productsPerPage={productsPerPage} 
                        currentPage={currentPage} 
                        paginate={paginate} 
                    />
                </>
            )}
        </div>
    );
}

export default ItemListContainer;
