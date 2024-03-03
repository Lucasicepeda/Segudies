import './App.css'
import { routes } from './Routes/routes';
import Header from './components/Header/Header'; 
import Banner from './components/Banner/Banner';
import Carrousel from './components/Carrousel/Carrousel';
import Filters from './components/Filters/Filters';
import Sheets from '/src/components/API/Sheets.jsx';
import CardProducto from './components/CardProducto/CardProducto';
import Footer from './components/Footer/Footer';


function App() {

  return (
    <>
      <Header />
      <Banner />
      <Carrousel />
      <Filters />
      <Sheets />
      <CardProducto />
      <Footer />

    </>
  )
}

export default App
