import './Header/header.css';
import search from '../assets/search.png';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db, coleccionFirebase } from '../firebase/config';
import { Link } from 'react-router-dom';

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  // Función para buscar productos
  const fetchProducts = async (searchTerm) => {
    const productosRef = collection(db, coleccionFirebase);
    try {
      // Construimos la consulta para obtener los primeros 10 productos
      const q = query(productosRef
    //    , limit(10)
        );

      // Si hay un término de búsqueda, lo filtramos
      if (searchTerm) {
        // Aquí puedes agregar lógica más compleja de filtrado si es necesario
        // Por ejemplo, puedes usar where para filtrar por múltiples campos
      }

      // Ejecutamos la consulta y obtenemos los resultados
      const querySnapshot = await getDocs(q);
      const productosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productosData);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  // Efecto para buscar productos inicialmente (opcional)
  useEffect(() => {
    // fetchProducts(); // Descomenta si quieres buscar todos los productos al inicio
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm) {
      fetchProducts(searchTerm);
    } else {
      setProducts([]);
    }
  };

  // Manejador para cuando se selecciona un producto
  const handleProductSelect = () => {
    setSearchTerm('');
  };

  // Filtramos los productos según el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.marca?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
            <div className="search-box">
                <input
                    type="text"
                    name="Busca tu producto"
                    id=""
                    placeholder='Busca tu producto'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button><img src={search} alt="Search" /></button>
            </div>
            <div className="results">

                {searchTerm !== '' && ( // Mostrar solo si el término de búsqueda no está vacío
                    <ul>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <li key={product.id}>
                                    <Link to={`item/${product.id}`} onClick={handleProductSelect}>
                                        {product.titulo} - {product.marca}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>No se encontraron productos</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Buscador;
