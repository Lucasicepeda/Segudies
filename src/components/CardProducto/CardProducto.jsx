// import './cardproducto.css';
// import React, { useEffect, useState } from 'react';


// async function getProductos() {
//     let productos;
    
//     let response;
//     try {
//         response = await gapi.client.sheets.spreadsheets.values.get({
//             spreadsheetId: '1PjlBRfdwQmTLgTZCes1evkAWpJL7pvm8CYdxAz6A5J0',
//             range: 'Majors!A:G',
//         });
//     } catch (err) {
//         console.error(err)
//         return;
//     }
//     const range = response.result;
//     if (!range || !range.values || range.values.length == 0) {
//         console.warn("No se encontraron valores")
//         return;
//     }

//     productos = [];
//     range.values.forEach((fila) => {
//         if (isNaN(parseInt(fila[0]))) return;
//         const nuevoProducto = {
//             id: fila[0],
//             cliente: fila[1],
//             email: fila[2],
//             modelo: fila[3],
//             problema: fila[4],
//             fecha_terminado: fila[5],
//             extracurricular: fila[6]
//         };
//         productos.push(nuevoProducto);
//     });
//     console.log(productos)
// }

// function CardProducto() {
//     const [productos, setProductos] = useState([]);

//     useEffect(() => {
//         getProductos().then((productos) => {
//             setProductos(productos);
//         });
//     }, []);

//     return (
//         <div id="productosContainer">
//             {/* Mapea los productos y devuelve un elemento para cada uno */}
//             {productos.map((producto, index) => (
//                 <div key={index}>
//                     <p>ID: {producto.id}</p>
//                     <p>Cliente: {producto.cliente}</p>
//                     <p>Email: {producto.email}</p>
//                     <p>Modelo: {producto.modelo}</p>
//                     <p>Problema: {producto.problema}</p>
//                     <p>Fecha terminado: {producto.fecha_terminado}</p>
//                     <p>Extracurricular: {producto.extracurricular}</p>
//                     <hr />
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default CardProducto;






    // <div className='cardProducto'>
    //     <div>
    //             <img src='../src/assets/Products/sierraBremen.png' alt='logoFooter' />
    //             <hr />
    //             <div className="textos">
    //                 <div className="nameProduct">Sierra Circular con Dientes de Widia</div>
    //                 <div className="precios">
    //                     <div className="precioLista">$2000</div>
    //                     <div className="precioRebaja">$1500</div>
    //                 </div>
    //                 <div className="cuotas">6 cuotas sin interes de $250</div>
    //             </div>
    //     </div>
    // </div>

