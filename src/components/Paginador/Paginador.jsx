import React from 'react';
import './paginador.css';

const Paginador = ({ productosFiltrados, productsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(productosFiltrados.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="paginador">
            {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? "active" : ""}>
                    <button onClick={() => paginate(number)}>{number}</button>
                </li>
            ))}
        </ul>
    );
};

export default Paginador;
