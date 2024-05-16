import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import atrasBtn from "../../assets/atrasBtn.svg"



const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [titulo, setTitulo] = useState("Productos");
    const marca = useParams().marca;

    useEffect(() => {
        const productosRef = collection(db, "productsListPrueba");
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

    return (
        <div>
            <Link to="/"><img className="atras-btn" src={atrasBtn} alt="atras"/></Link>   
            {productos.length === 0 ? (
                    <p className="notProduct">No existen productos de la marca {marca}</p>
                ) : (
                    <ItemList productos={productos} titulo={titulo} />
                )} 
        </div>
    );
}

export default ItemListContainer;