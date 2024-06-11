import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';

const Checkout = () => {
    const [pedidoId, setPedidoId] = useState("");

    const { carrito, vaciarCarrito } = useContext(CartContext);

    const { register, handleSubmit } = useForm();

    const comprar = (data) => {
        const pedido = {
            cliente: data,
            productos: carrito,
        }
        console.log(pedido);

        const pedidosRef = collection(db, "pedidos");

        addDoc(pedidosRef, pedido)
            .then((doc) => {
                setPedidoId(doc.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.error("Error al agregar el documento: ", error);
            });
    }

    if (pedidoId) {
        return (
            <div className="container">
                <h1 className="main-title">Muchas gracias por tu compra</h1>
                <p>Tu número de pedido es: {pedidoId}</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="main-title">Finalizar compra</h1>
            <form className="formulario" onSubmit={handleSubmit(comprar)}>
                <input type="text" placeholder="Ingresá tu nombre" {...register("nombre", { required: true })} />
                <input type="email" placeholder="Ingresá tu e-mail" {...register("email", { required: true })} />
                <input type="phone" placeholder="Ingresá tu teléfono" {...register("telefono", { required: true })} />
                <button className="enviar" type="submit">Comprar</button>
            </form>
        </div>
    )
}

export default Checkout
