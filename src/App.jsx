import "./App.css";
import "./main.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Carrousel from "./components/Carrousel/Carrousel";
import Filters from "./components/Filters/Filters.jsx";
import Footer from "./components/Footer/Footer";
import ProductsList from './components/PanelAdmin/ProductsList.jsx';
import CrudProduct from './components/PanelAdmin/CrudProduct.jsx';
import Edit from './components/PanelAdmin/Edit.jsx';
import Create from './components/PanelAdmin/Create.jsx';
import ItemDetailContainer from "./components/Item/ItemDetailContainer";
import ItemListContainer from "./components/Item/ItemListContainer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";
import WhatsappIcon from "./components/WhatsappIcon/WhatsappIcon.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Login from './components/PanelAdmin/Login';
import AdminRoute from "./components/PanelAdmin/AdminRoute";
import { getAuth, signOut } from "firebase/auth";
import useIdleTimer from "./firebase/useIdleTimer.js";

function App() {


  const auth = getAuth();
  
  // Función para cerrar sesión
  const handleIdle = () => {
    signOut(auth).then(() => {
      console.log("User signed out due to inactivity");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  // Configura el tiempo de inactividad en milisegundos (ejemplo: 5 minutos)
  useIdleTimer(5 * 60 * 1000, handleIdle);

  return (
    <CartProvider>
      <SpeedInsights />
      <BrowserRouter>
        <Header />
        <WhatsappIcon />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Carrousel />
                <Filters />
              </>
            }
          />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/productos/:marca" element={<ItemListContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <AdminRoute>
              <ProductsList />
            </AdminRoute>
          } />
          <Route path="/admin/edit/:id" element={
            <AdminRoute>
              <Edit />
            </AdminRoute>
          } />
          <Route path="/admin/create" element={
            <AdminRoute>
              <Create />
            </AdminRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

  