import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const allowedEmails = ["lucas.cepeda2@gmail.com", "admin@example.com"]; // lista de emails permitidos

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && allowedEmails.includes(user.email)) {
        setUser(user);
      } else {
        if (user) {
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'No fue posible acceder al panel de administrador. Por favor, inténtelo con un e-mail autorizado.',
          });
        }
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default AdminRoute;


