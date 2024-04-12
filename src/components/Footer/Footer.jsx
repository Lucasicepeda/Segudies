import './footer.css';
import insta from './images/insta.png';
import face from './images/face.png';
import logoF from './images/logoFooter.png';

const Footer = () => {
    return (
        <footer>
            <div className="redes">
                <a href="/">
                    <img src={insta} alt='Instagram' />
                </a>
                <a href="/">
                    <img src={face} alt='Facebook' />
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
                    <img src={logoF} alt='logoFooter' />
                </a>
            </div>
        </footer>
    )
}

export default Footer;