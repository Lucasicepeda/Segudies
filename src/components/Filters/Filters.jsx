import './filters.css';

function Filters() {

return (
        <div className="Filters">
            <div className='text'>
                <p>FILTRAR POR</p>
            </div>
            <form id="filtroBusqueda">
                <div className="ordenMarca">
                    <select name="selectMarca">
                        <option value="" disabled selected hidden>Marca:</option>
                        <option data-count="1" value="Libus">Libus</option>
                        <option data-count="23" value="Bremen">Bremen</option>
                        <option data-count="433" value="Truper">Truper</option>
                        <option data-count="45" value="Luqstoff">Luqstoff</option>
                    </select>
                </div>
                <div className="ordenPrecio">
                    <select name="selectPrecio">
                        <option value="" disabled selected hidden>Ordenar por:</option>
                        <option value="menorPrecio">Menor precio</option>
                        <option value="mayorPrecio">Mayor precio</option>
                    </select>
                </div>
                <div className="Buscar">
                    <input type="submit" value="BUSCAR"/>
                </div>
            </form>
        </div>
    )

}

export default Filters;