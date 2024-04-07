import './footer.css';

export function Footer() {
    return (
        <footer>
            <div className="redes">
                <a href="/">
                    <img src='../src/assets/Insta.png' alt='Instagram' />
                </a>
                <a href="/">
                    <img src='../src/assets/Face.png' alt='Facebook' />
                </a>
            </div>
            <div className="formOfertas">
                <p>Dejanos tu contacto y recibí las mejores ofertas</p>
                <input type="mail" name="mailOfertas" id="" placeholder='ejemplo@gmail.com' />
                <button className='mailOfertas'>
                    <a href="/??">Enviar </a>
                </button>

            </div>
            <div className="logoFooter">
                <a href="/">
                    <img src='../src/assets/segudiesLogoFooter.png' alt='logoFooter' />
                </a>
            </div>
        </footer>
    )
}