import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import editIcon from "./assetsAdmin/editIcon.svg";
import borrarIcon from "./assetsAdmin/borrarIcon.svg";
import customStyles from "./customStyles";
import "./admin.css";


const ProductsList = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const productosRef = collection(db, "productsListPrueba");

    getDocs(productosRef)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          editar: <img src={editIcon} alt="Editar" className="edit-icon" />,
          borrar: <img src={borrarIcon} alt="Borrar" className="borrar-icon" />
        }));
        setProductosFiltrados(productosData);
        setRecords(productosData);
      })
      .catch((error) => {
        console.error("Error obteniendo productos:", error);
      });
  }, []);

  const columns = [
    {
      name: "Titulo",
      selector: row => row.titulo,
      sortable: true,
      width: '40vw'
    },
    {
      name: "Categoría",
      selector: row => row.categoria,
      sortable: true,
      width: '20vw'
    },
    {
      name: "Marca",
      selector: row => row.marca,
      sortable: true,
      width: '20vw'
    },
    {
      name: "Editar",
      selector: row => row.editar,
      cell: row => <Link to={`/edit/${row.id}`}><img src={editIcon} alt="Editar" className="edit-icon" /></Link>,
      width: '7vw' // Ancho predeterminado
    },
    {
      name: "Borrar",
      selector: row => row.borrar,
      cell: row => <img src={borrarIcon} alt="Borrar" className="borrar-icon" />,
      width: '7vw' // Ancho predeterminado
    },
  ];

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = productosFiltrados.filter(row =>
      row.titulo.toLowerCase().includes(searchTerm)
    );
    setRecords(filteredData);
  };

  return (
    <div className="productsList">
      <div className="header-table">
        <div className='text-end'><input type="text" onChange={handleFilter} placeholder="Filtrar por título" /></div>
        <div className="newProduct-btn"><button>+ Producto</button></div>
      </div>
      <div className="productsAdmin">
        {records.length === 0 ? (
          <p>No existen productos disponibles</p>
        ) : (
          <DataTable
            className="dataTable"
            columns={columns}
            data={records}
            fixedHeader
            pagination
            striped
            customStyles={customStyles}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsList;
