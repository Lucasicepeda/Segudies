import './cardproducto.css';

const CardProducto= () => {

    
    return (
        <div className='cardProducto'>
            <div>
                <img src='../src/assets/Products/sierraBremen.png' alt='logoFooter' />
                <hr />
                <div className="textos">
                    <div className="nameProduct">Sierra Circular con Dientes de Widia</div>
                    <div className="precios">
                        <div className="precio">$1500</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProducto;