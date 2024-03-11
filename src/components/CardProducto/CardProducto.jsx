import './cardproducto.css';


function CardProducto() {


    
    return (
        <div className='cardProducto'>
        <div>
                <img src='../src/assets/Products/sierraBremen.png' alt='logoFooter' />
                <hr />
                <div className="textos">
                    <div className="nameProduct">Sierra Circular con Dientes de Widia</div>
                    <div className="precios">
                        <div className="precioLista">$2000</div>
                        <div className="precioRebaja">$1500</div>
                    </div>
                    <div className="cuotas">6 cuotas sin interes de $250</div>
                </div>
        </div>
    </div>
    )

}

export default CardProducto;


