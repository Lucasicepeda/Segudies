import React from 'react';
import './carrousel.css';

import bremen from './logos/bremen.png';
import daihatsu from './logos/daihatsu.png';
import libus from './logos/libus.svg';
import lusqtoff from './logos/lusqtoff.png';
import truper from './logos/truper.png';
import tresM from './logos/3m.svg';
import mapa from './logos/mapa.png';
import { Link } from 'react-router-dom';

const images = [
  { src: tresM, alt: '3M' },
  { src: truper, alt: 'Truper' },
  { src: bremen, alt: 'Bremen' },
  { src: daihatsu, alt: 'Daihatsu' },
  { src: libus, alt: 'Libus' },
  { src: lusqtoff, alt: 'Lusqtoff' },
  { src: mapa, alt: 'Mapa' }
];

const Carrousel = () => {
  return (
    <div className="logos">
      {[...Array(3)].map((_, slideIndex) => (
        <div key={slideIndex} className="logos-slide">
          {images.map((image, index) => (
            <Link key={index} to={`/productos/${image.alt}`} >
              <img src={image.src} alt={image.alt} />
            </Link>
          ))}
        </div>
      ))}
    </div>

  );
}

export default Carrousel;

