import './App.css'
import "./main.css";
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Carrousel from './components/Carrousel/Carrousel';
import Filters from './components/Filters/Filters.jsx';
import Footer from './components/Footer/Footer';
import ItemDetailContainer from "./components/Item/ItemDetailContainer";
import ItemListContainer from "./components/Item/ItemListContainer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";
import Contacto from "./components/Contacto";
import Nosotros from "./components/Nosotros";

function App() {

  return (
    <CartProvider>

      <BrowserRouter>

        <Header />

        <Routes>
          <Route path='/' element={<>
            <Banner />
            <Carrousel />
            <Filters />
            <ItemListContainer />
          </>} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/productos/:marca" element={<ItemListContainer />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Footer />

      </BrowserRouter>

    </CartProvider>

  )
}

export default App
