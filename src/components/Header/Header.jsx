import './header.css';
import CartWidget from '../CartWidget'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';


const Header = () => {
    return (
        <header>
            <Link to="/" className="logo">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="search">
                <input type="text" name="Busca tu producto" id="" placeholder='Busca tu producto' />
                <button><img src={search} alt="Search" /></button>
            </div>
            <div className="btns">
                <div className="catalogo">
                    <Link className="menu-link" to="/catalogo">Catálogo</Link>

                </div>
                <div className="ofertas">
                    <Link className="menu-link" to="/ofertas">Ofertas</Link>

                </div>
                <div><CartWidget /></div>
            </div>
        </header>
    )
}

export default Header;