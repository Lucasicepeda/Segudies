import React from 'react';
import './paginador.css';
import chevronLeft from "../../assets/chevron-left.svg"
import chevronRight from "../../assets/chevron-right.svg"

const Paginador = ({ productosFiltrados, productsPerPage, currentPage, paginate }) => {
    const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);
    const pageNumbers = [];

    // Determinar si hay más de 5 páginas
    const showEllipsis = totalPages > 5;

    // Determinar las páginas a mostrar
    let startPage, endPage;
    if (showEllipsis) {
        if (currentPage <= 2) { // Cambiado a 2 para mostrar la flecha izquierda desde la segunda página
            startPage = 1;
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
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
            {showEllipsis && currentPage > 2 && (
                <li className="ellipsis" onClick={() => paginate(currentPage - 1)}>                    
                    <button><img className="btn-pgn" src={chevronLeft} alt="Anterior" /></button>
                </li>
            )}
            {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? "active" : ""}>
                    <button onClick={() => paginate(number)}>{number}</button>
                </li>
            ))}
            {showEllipsis && currentPage < totalPages - 2 && (
                <li className="ellipsis" onClick={() => paginate(currentPage + 1)}>
                    <button><img className="btn-pgn" src={chevronRight} alt="Siguiente" /></button>
                </li>
            )}
        </ul>
    );
};

export default Paginador;
