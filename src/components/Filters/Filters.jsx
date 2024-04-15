import { Link } from 'react-router-dom';
import './filters.css';


const Filters = () => {

    return (
        <div className="Filters">
            <div className='text'>
                <p>FILTRAR POR</p>
            </div>
            <form id="filtroBusqueda">
                <div className="ordenMarca">
                    <select name="selectMarca" defaultValue="">
                        <option value="" disabled hidden>Marca:</option>
                        <option data-count="1" value="Libus">Libus</option>
                        <option data-count="2" value="Bremen">Bremen</option>
                        <option data-count="3" value="Truper">Truper</option>
                        <option data-count="4" value="Luqstoff">Luqstoff</option>
                        {/* <option data-count="4" value="Luqstoff"><Link to="/productos/:Luqstoff">Luqstoff</Link></option> */}
                    </select>
                </div>
                <div className="ordenPrecio">
                    <select name="selectPrecio" defaultValue="">
                        <option value="" disabled hidden>Ordenar por:</option>
                        <option value="menorPrecio">Menor precio</option>
                        <option value="mayorPrecio">Mayor precio</option>
                    </select>
                </div>
                <div className="buscar-btn">
                    <input type="submit" value="BUSCAR" />
                </div>
            </form>
        </div>
    )
}

export default Filters;