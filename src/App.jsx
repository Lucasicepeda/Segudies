import './App.css'
import { routes } from './Routes/routes';
import Header from './components/Header/Header'; 
import Banner from './components/Banner/Banner';
import Carrousel from './components/Carrousel/Carrousel';
import Filters from './components/Filters/Filters'
import CardProducto from './components/CardProducto/CardProducto';
import Footer from './components/Footer/Footer';


function App() {

  return (
    <>
      <Header />
      <Banner />
      <Carrousel />
      <CardProducto />
      <Filters />
      {/* <Products /> */}
      <Footer />

    </>
  )
}

export default App
