import React from 'react'
import { Link } from 'react-router-dom'
import './whatsappIcon.css';
import icon from '../../assets/whatsapp.svg'


function WhatsappIcon() {
  return (
    <Link to="https://wa.me/+5491162637388" className="btn-wsp" target="_blank">
	    <img className="wsp-img" src={icon} alt="whatsapp"/>
    </Link>
  )
}

export default WhatsappIcon