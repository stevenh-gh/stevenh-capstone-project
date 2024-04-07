import "./App.css";

import { Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  return (
    <Container>
      {/* test to let me know if i'm logged in */}
      {token && token.length > 0 ? <p>logged in</p> : <p>not logged in</p>}

      <Navbar token={token} setToken={setToken} />
      <Header txt={"tentative e-shop title"} />
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Container>
  );
}

export default App;
