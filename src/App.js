// import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
import {ToastContainer} from 'react-toastify';
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyroute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";


function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path='/admin/*' element={<AdminOnlyRoute>
            <Admin />
          </AdminOnlyRoute>} />

          <Route path="/cart" element={<Cart />} />



        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
