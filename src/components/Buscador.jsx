import './Header/header.css';
import search from '../assets/search.png';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db, coleccionFirebase } from '../firebase/config';
import { Link } from 'react-router-dom';

const Buscador = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productosRef = collection(db, coleccionFirebase);
            try {
                const productsSnapshot = await getDocs(productosRef);
                const productosData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productosData); // Actualizar el estado de products
            } catch (error) {
                console.error("Error obteniendo productos:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleProductSelect = () => {
        setSearchTerm(''); // Limpiar el término de búsqueda al seleccionar un producto
    };
    
    const filteredProducts = products.filter(product =>
        product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
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
                                        {product.titulo}
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
