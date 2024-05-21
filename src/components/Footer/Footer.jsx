import './footer.css';
import insta from './images/insta.png';
import face from './images/face.png';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="redes">
                <Link to="https://www.instagram.com/segudies/"><img src={insta} alt='Instagram' /></Link>
                <Link to="https://www.facebook.com/segudies.silva.5"><img src={face} alt='Facebook' /></Link>
            </div>
            {/* <div className="formOfertas">
                <p>Dejanos tu contacto y recibí las mejores ofertas</p>
                <input type="mail" name="mailOfertas" id="" placeholder='ejemplo@gmail.com' />
                <button className='mailOfertas'>
                    <a href="/??">Enviar </a>
                </button>
            </div> */}
            <div className="logoFooter">
                <a href="/">
                    <img src={logo} alt='logoFooter' />
                </a>
            </div>
        </footer>
    )
}

export default Footer;