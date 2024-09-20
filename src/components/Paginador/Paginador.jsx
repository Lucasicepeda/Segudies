import React from 'react';
import './paginador.css';
import chevronLeft from "../../assets/chevron-left.svg";
import chevronRight from "../../assets/chevron-right.svg";

const Paginador = ({ totalPages, currentPage, paginate }) => {
    const pageNumbers = [];

    let startPage, endPage;
    if (totalPages > 5) {
        if (currentPage <= 2) {
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
            {currentPage > 1 && (
                <li onClick={() => paginate(currentPage - 1)}>
                    <button>
                        <img className="btn-pgn" src={chevronLeft} alt="Anterior" />
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
                        <img className="btn-pgn" src={chevronRight} alt="Siguiente" />
                    </button>
                </li>
            )}
        </ul>
    );
};

export default Paginador;
