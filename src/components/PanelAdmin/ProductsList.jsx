import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Paginador from "../Paginador/Paginador";
import DataTable from "react-data-table-component";
import "./admin.css";

const ProductsList = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  useEffect(() => {
    const productosRef = collection(db, "productsListPrueba");

    getDocs(productosRef)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductosFiltrados(productosData);
      })
      .catch((error) => {
        console.error("Error obteniendo productos:", error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const columns = [
    {
      name: "Titulo",
      selector: row => row.titulo
    },
    {
      name: "Categoría",
      selector: row => row.categoria
    },
    {
      name: "Marca",
      selector: row => row.marca
    },
    {
      name: "Precio",
      selector: row => row.precio
    },
    {
      name: "Editar",
      selector: row => row.editar
    },
    {
      name: "Borrar",
      selector: row => row.borrar
    },
  ]

  const data = currentProducts.map((producto) => ({
    titulo: producto.titulo || "Sin título",
    categoria: producto.categoria || "Sin categoría",
    marca: producto.marca || "Sin marca",
    precio: producto.precio !== undefined ? producto.precio : "0.00",
    editar: "ED",
    borrar: "x"
  }));
  

  return (
    <div className="productsList">
      <div className="productsAdmin">
        {currentProducts.length === 0 ? (
          <p>No existen productos disponibles</p>
        ) : (
          <DataTable
            columns={columns}
            data={data}
          />
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

export default ProductsList;
