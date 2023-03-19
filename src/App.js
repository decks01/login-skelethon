import "bootstrap/dist/css/bootstrap.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import Index from "./auntetificacion/Login.js";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SideBar from "./components/globals/SideBar";
import "animate.css";
import Users from "./views/users/Users.js";
import { useEffect } from "react";
import Products from "./views/products/Products.js";
import Cats from "./views/cats/Cats.js";
import DirectionsOrders from "./views/directionsorders/DirectionsOrders.js";
import DetailsOrders from "./views/detailsorders/DetailsOrders.js";
import Orders from "./views/orders/Orders.js";


function App() {
  const token = localStorage.getItem("token");
  
  
  if(!token || token === null) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route exact path="*" element={<Home />} />
          <Route exact path="/usuarios" element={<Users />} />
          <Route exact path="/categorias" element={<Cats />} />
          <Route exact path="/productos" element={<Products />} />
          <Route exact path="/direcciones" element={<DirectionsOrders />} />
          <Route exact path="/detalles" element={<DetailsOrders />} />
          <Route exact path="/pedidos" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
