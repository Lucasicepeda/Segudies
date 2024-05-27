import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import atrasBtn from "../../assets/atrasBtn.svg";
import './crudStyle.css'

const CrudProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productsListPrueba", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No existe el producto con ID:", id);
        }
      } catch (error) {
        console.error("Error obteniendo producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <Link to="/admin"><img className="atras-btn" src={atrasBtn} alt="Atrás" /></Link>
      {product ? (
        <div className="product-details">
          <h2>Detalles del Producto</h2>
          <ul>
            <li ><strong>ID:</strong> {product.id}</li>
            <li><strong>Título:</strong> {product.titulo}</li>
            <li><strong>Categoría:</strong> {product.categoria}</li>
            <li><strong>Código:</strong> {product.codigo}</li>
            <li><strong>Descripción:</strong> {product.descripcion}</li>
            <li><strong>Marca:</strong> {product.marca}</li>
            <li><strong>Precio:</strong> {product.precio}</li>
            <li>
              <strong>Imágenes:</strong>
              <ul className="images-container">
                {product.images && product.images.map((image, index) => (
                  <li key={index}><img className="images" src={image} alt={`Imagen ${index + 1}`} /></li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      ) : (
        <p className="notProduct">Cargando...</p>
      )}
    </div>
  );
};

export default CrudProduct;
