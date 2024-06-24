import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, coleccionFirebase } from "../../firebase/config";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import editIcon from "./assetsAdmin/editIcon.svg";
import borrarIcon from "./assetsAdmin/borrarIcon.svg";
import customStyles from "./customStyles";
import "./admin.css";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ProductsList = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [records, setRecords] = useState([]);

  const fetchProducts = async () => {
    try {
      const productosRef = collection(db, coleccionFirebase);
      const resp = await getDocs(productosRef);
      const productosData = resp.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        editar: <img src={editIcon} alt="Editar" className="edit-icon" />,
        borrar: <img src={borrarIcon} alt="Borrar" className="borrar-icon" />,
      }));
      setProductosFiltrados(productosData);
      setRecords(productosData);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      name: "Titulo",
      selector: (row) => row.titulo,
      sortable: true,
      width: "40vw",
      cell: (row) => <div className="custom-column-title">{row.titulo}</div>, // Agregar clase CSS personalizada para el título
    },
    {
      name: "Marca",
      selector: (row) => row.marca,
      sortable: true,
      width: "20vw",
      cell: (row) => <div className="custom-column-marca">{row.marca}</div>, // Agregar clase CSS personalizada para la marca
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
      width: "7vw",
    },
    {
      name: "Borrar",
      selector: (row) => row.borrar,
      cell: (row) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Previene la navegación predeterminada
            confirmDelete(row.id, row.titulo);
          }}
        >
          <img src={borrarIcon} alt="Borrar" className="borrar-icon" />
        </a>
      ),
      width: "7vw",
    },
  ];

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = productosFiltrados.filter((row) =>
      row.titulo.toLowerCase().includes(searchTerm)
    );
    setRecords(filteredData);
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, coleccionFirebase, id);
    await deleteDoc(productDoc);
    await fetchProducts(); // Refresca la lista de productos después de eliminar
  };

  const confirmDelete = (id, titulo) => {
    MySwal.fire({
      title: "¿Desea eliminar este producto?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
        MySwal.fire({
          title: "Eliminado!",
          text: `El producto "${titulo}" fue eliminado correctamente`,
          icon: "success",
        }).then(() => {
          navigate("/admin"); // Redirige después de actualizar la lista
        });
      }
    });
  };

  // LOGOUT
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirigir a la página de inicio de sesión después del cierre de sesión
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  // LOGOUT

  return (
    <div className="productsList">
      <button className="signOut-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <div className="header-table">
        <div className="text-end">
          <input
            type="text"
            onChange={handleFilter}
            placeholder="Filtrar por título"
          />
        </div>
        <Link to="./create" className="newProduct-btn">
          Nuevo Producto
        </Link>
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
