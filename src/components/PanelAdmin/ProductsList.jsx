import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs, getCountFromServer } from "firebase/firestore";
import { db, coleccionFirebase } from "../../firebase/config";
import DataTable from "react-data-table-component";
import "./admin.css";
import { Link } from "react-router-dom";
import editIcon from "./assetsAdmin/editIcon.svg";
import borrarIcon from "./assetsAdmin/borrarIcon.svg";
import BarLoader from "react-spinners/BarLoader";

const ProductsList = React.memo(() => {

// const ProductsList = () => {
  const [productos, setProductos] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;

  const fetchProducts = async (page) => {
    setLoading(true);
    const productosRef = collection(db, coleccionFirebase);

    // Consulta para la página actual
    let productosQuery;
    if (page === 1) {
        productosQuery = query(
            productosRef,
            orderBy("titulo"),
            limit(productsPerPage)
        );
    } else {
        productosQuery = query(
            productosRef,
            orderBy("titulo"),
            startAfter(lastDoc), // Comienza después del último documento de la página anterior
            limit(productsPerPage)
        );
    }

    try {
        const resp = await getDocs(productosQuery);
        const productosData = resp.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        setProductos(productosData);
        setLastDoc(resp.docs[resp.docs.length - 1]);

        // Obtener el total de productos para calcular las páginas (se hace solo una vez)
        if (page === 1) {
          const totalProductosSnapshot = await getCountFromServer(collection(db, coleccionFirebase));
          const totalPages = Math.ceil(totalProductosSnapshot.data().count / productsPerPage);
        
          // No limitar las páginas a 1
          setTotalPages(totalPages);
        }

        setLoading(false);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        // Mostrar un mensaje de error al usuario
        setErrorMsg("Ocurrió un error al cargar los productos.");
        setLoading(false);
    }
};

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      name: "Titulo",
      selector: (row) => row.titulo,
      sortable: true,
      width: "40vw",
    },
    {
      name: "Marca",
      selector: (row) => row.marca,
      sortable: true,
      width: "20vw",
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria,
      sortable: true,
      width: "20vw",
    },
    {
      name: "Editar",
      selector: (row) => row.editar,
      cell: (row) => (
        <Link to={`/admin/edit/${row.id}`}>
          <img src={editIcon} alt="Editar" className="edit-icon" />
        </Link>
      ),
      width: "6vw",
    },
    {
      name: "Borrar",
      selector: (row) => row.borrar,
      cell: (row) => (
        <a href="#" onClick={(e) => { e.preventDefault(); confirmDelete(row.id, row.titulo); }}>
          <img src={borrarIcon} alt="Borrar" className="borrar-icon" />
        </a>
      ),
      width: "6vw",
    },
  ];

  // Calcular las páginas a mostrar en el paginador
  const renderPagination = () => {
    const pageNumbers = [];
    let startPage, endPage;
    if (totalPages > 5) {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    } else {
      startPage = 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="paginador">
        {currentPage > 1 && (
          <li onClick={() => paginate(currentPage - 1)}>
            <button>
              <img className="btn-pgn" src="../../assets/chevron-left.svg" alt="Anterior" />
            </button>
          </li>
        )}
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li onClick={() => paginate(currentPage + 1)}>
            <button>
              <img className="btn-pgn" src="../../assets/chevron-right.svg" alt="Siguiente" />
            </button>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="productsList">
      {loading ? (
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
          <DataTable
            className="dataTable"
            columns={columns}
            data={productos}
            fixedHeader
            striped
          />
          {renderPagination()}
        </>
      )}
    </div>
  );
});

export default ProductsList;
