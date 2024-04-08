import './banner.css';
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="banner">
            <div className="left">
                <div className="texts">
                    <h3>Tu seguridad y éxito son nuestro prioridad</h3>
                    <h5>Descubre nuestro catálogo de productos especializados y confiá en nuestra experiencia en distribucion de seguridad industrial, maquinas y herramientas.</h5>
                </div>
                <div className="buttons">
                    <button className='catalogoBtn'>
                        <Link className="menu-link" to="/catalogo">Ver Catálogo</Link>
                    </button>
                    <button className='destacadosBtn'>
                        <Link className="menu-link" to="/ofertas">Destacados</Link>    
                    </button>
                </div>
            </div>
            <div className="right">
                <img src="../src/assets/lusqtoff-AMOLADORA.png" alt="" />
            </div>
        </div>
    )
}

export default Banner;