// import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
import {ToastContainer} from 'react-toastify';
import AdminOnlyroute from "./components/adminOnlyRoute/AdminOnlyroute";


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

          <Route path='/admin/*' element={<AdminOnlyroute>
            <Admin />
          </AdminOnlyroute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
