import './header.css';
import CartWidget from '../CartWidget'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header>
            <Link to="/" className="logo">
                <img src='./assets/logo.png' alt='logo' />
            </Link>
            <div className="search">
                <input type="text" name="Busca tu producto" id="" placeholder='Busca tu producto' />
                <button><img src="src/assets/search.png" /></button>
            </div>
            <div className="btns">
                <div className="catalogo">
                    <Link className="menu-link" to="/catalogo"><a href="/catalogo">Catálogo</a></Link>
                </div>
                <div className="ofertas">
                    <Link className="menu-link" to="/ofertas"><a href="/ofertas">Ofertas</a></Link>
                </div>
                <div><CartWidget /></div>
            </div>
        </header>
    )
}

export default Header;