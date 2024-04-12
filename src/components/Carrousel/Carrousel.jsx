import './carrousel.css';

import bremen from './images/bremen.png'
import daihatsu from './images/daihatsu.png'
import libus from './images/libus.png'
import lusqtoff from './images/lusqtoff.png'
import truper from './images/truper.png'


const Carrousel = () => {


    
return (
        <div className='icons'>
            <div className="icon2">
                <img src={truper} alt="truper" />
            </div>
            <div className="icon5">
                <img src={bremen} alt="Bremen"  />
            </div>
            <div className="icon3">
                <img src={daihatsu} alt="Daihatsu" />
            </div>
            <div className="icon4">
                <img src={libus} alt="libus"  />
            </div>
            <div className="icon1">
                <img src={lusqtoff} alt="Lusqtoff" />
            </div>
        </div>
    )

}

export default Carrousel;
