import './cardproducto.css';

function CardProducto() {

    async function getProductos() {
        let response;
        try {
            response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1PjlBRfdwQmTLgTZCes1evkAWpJL7pvm8CYdxAz6A5J0',
                range: 'Majors!A:F',
            });
        } catch (err) {
            console.error(err)
            return;
        }
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            console.warn("No se encontraron valores")
            return;
        }
        console.log(range.values)

        // https://www.youtube.com/watch?v=GUgf4UmYnHQ 
        // Minuto 23:15
    } 

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


