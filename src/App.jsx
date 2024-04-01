import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  return (
    <>
      {/* test to let me know if i'm logged in */}
      {token && token.length > 0 ? <p>logged in</p> : <p>not logged in</p>}

      <Navbar token={token} setToken={setToken} />
      <Header txt={"tentative e-shop title"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
