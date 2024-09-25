import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const allowedEmails = ["segudies10@gmail.com"]; // lista de emails permitidos

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && allowedEmails.includes(user.email)) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está permitido, renderizar el contenido
  return (
    <>
      {children}
    </>
  );
};

export default AdminRoute;
