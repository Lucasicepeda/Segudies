import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

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
            <ItemList productos={productos} titulo={titulo} />
        </div>
    );
}

export default ItemListContainer;