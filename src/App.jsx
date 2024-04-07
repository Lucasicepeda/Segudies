import './App.css'
import { Header } from './components/Headerlc/Header'; 
import { Banner } from './components/Bannerlc/Banner';
import { Carrousel } from './components/Carrousellc/Carrousel';
import { Filters } from './components/Filterslc/Filters';
import { CardProducto } from './components/CardProductolc/CardProducto';
import { Footer } from './components/Footerlc/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contacto from "./components/Contacto";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import Navbar from "./components/Navbar";
import Nosotros from "./components/Nosotros";
import "./main.css";
import { CartProvider } from "./context/CartContext";
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";

function App() {

  return (
    <CartProvider>

      <BrowserRouter>

        <Navbar />
        
        <Header />

        <Routes>
          <Route path='/' element={<Banner />} />
          <Route path='/' element={<Carrousel />} /> 
          <Route path='/' element={<Filters />} />
          <Route path='/' element={<CardProducto />} />

          <Route path="/" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />}/>
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/productos/:categoria" element={<ItemListContainer />} />
          <Route path="/nosotros" element={<Nosotros />}/>
          <Route path="/contacto" element={<Contacto />}/>
          <Route path="/carrito" element={<Carrito />}/>
          <Route path="/checkout" element={<Checkout />}/>
        </Routes>
        <Footer />

      </BrowserRouter>
    </CartProvider>

  )
}

export default App
