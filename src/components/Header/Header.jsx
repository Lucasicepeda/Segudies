import './header.css';
import CartWidget from '../CartWidget'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';
import Buscador from '../Buscador.jsx';

const Header = () => {
    return (
        <header>
            <Link to="/" className="logo">
                <img src={logo} alt="Logo" />
            </Link>
            <Buscador />
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