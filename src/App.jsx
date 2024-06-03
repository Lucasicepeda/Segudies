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


function App() {
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
          {/* <Route path="/productos" element={<ItemListContainer />} /> */}
          <Route path="/productos/:marca" element={<ItemListContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<ProductsList />} />
          <Route path="/admin/edit/:id" element={<Edit />} />
          <Route path="/admin/create/" element={<Create />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
