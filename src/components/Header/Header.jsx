import './header.css';

function Header() {

return (
    <header>
        <div className="logo">
            <a href="/"> 
            <img src='../src/assets/logo.png' alt='logo' />
            </a>
        </div>
        <div className="search">
                <input type="text" name="Busca tu producto" id="" placeholder='Busca tu producto'/>
                <button><img src="../src/assets/search.png" alt="" srcset="" /></button>
        </div>
        <div className="btns">
            <div className="catalogo">
                <a href="/catalogo">Catálogo</a>
            </div>
            <div className="ofertas">
                <a href="/ofertas">Ofertas</a>
            </div>
        </div>
    </header>
)

}

export default Header;