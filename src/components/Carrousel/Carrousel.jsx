import './carrousel.css';

import bremen from './logos/bremen.png'
import daihatsu from './logos/daihatsu.png'
import libus from './logos/libus.png'
import lusqtoff from './logos/lusqtoff.png'
import truper from './logos/truper.png'
import tresM from './logos/3m.svg'


const Carrousel = () => {

    return (
        <div className="logos">
            <div className="logos-slide">
                <img src={tresM} alt="3M" />
                <img src={truper} alt="truper" />
                <img src={bremen} alt="Bremen" />
                <img src={daihatsu} alt="Daihatsu" />
                <img src={libus} alt="libus" />
                <img src={lusqtoff} alt="Lusqtoff" />
            </div>

            <div className="logos-slide">
                <img src={tresM} alt="3M" />
                <img src={truper} alt="truper" />
                <img src={bremen} alt="Bremen" />
                <img src={daihatsu} alt="Daihatsu" />
                <img src={libus} alt="libus" />
                <img src={lusqtoff} alt="Lusqtoff" />
            </div>
        </div>

    )

}

export default Carrousel;
