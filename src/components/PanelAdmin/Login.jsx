import React from 'react';
import { auth, googleProvider } from '../../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        navigate('/admin'); // Redirigir a '/admin' después de una autenticación exitosa
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes permiso para acceder al panel de administrador.',
        });
      });
  };

  return (
    <div className='signIn-btn-container'>
      <button className='signIn-btn' onClick={signInWithGoogle}>Iniciar sesion de administrador</button>
    </div>
  );
};

export default Login;
