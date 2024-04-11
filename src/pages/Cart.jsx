import { Box, Button, IconButton, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getCart, getProduct } from "../api";
import { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete"
import EditCartProductMenu from "../components/EditCartProductMenu";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../components/Header";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Typography } from "@mui/material";

function Cart() {
  // !window.localStorage.getItem('cart') && window.localStorage.setItem('cart', '')
  const [cart, setCart] = useState(null);
  const [updateCart, setUpdateCart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function gc() {
      const json = await getCart();
      window.localStorage.setItem('cart', JSON.stringify(json))
      setCart(window.localStorage.getItem('cart'))
    }
    !window.localStorage.getItem('cart') && gc();
    // gc();
  }, []);

  useEffect(() => {
    setCart(window.localStorage.getItem('cart'))
  }, [window.localStorage.getItem('cart')])

  useEffect(() => {
    async function gp() {
      if (cart) {
        const res = await Promise.all(
          JSON.parse(cart).products.map(async product => {
            const p = await getProduct(product.productId);
            return { ...p, quantity: product.quantity };
          }),
        );
        const updatedCart = { ...cart, products: res };
        setUpdateCart(updatedCart);
      }
    }
    gp();
  }, [cart]);

  function removeProduct(id) {
    let cart = window.localStorage.getItem('cart');
    cart = JSON.parse(cart)
    const cartProd = cart.products;
    const filteredCart = cartProd.filter(product => product.productId !== id);
    cart = { ...cart, products: filteredCart }
    window.localStorage.setItem('cart', JSON.stringify(cart))
    setCart(window.localStorage.getItem('cart'))
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header txt={"Cart"} />
        <Button onClick={() => navigate('/checkout')} size="large" variant="contained">Proceed to checkout <ShoppingCartCheckoutIcon sx={{ marginLeft: '15px' }} /></Button>
      </Box>
      <Grid container spacing={3}>
        {/* updateCart && console.log(updateCart) */}
        {updateCart && updateCart.products.map(product => {
          return (
            <Grid key={product.id} xs={4}>
              <Paper sx={{ height: "100%", display: "flex", alignContent: "space-around" }}>
                <Link to={`/product/${product.id}`}>
                  <Box sx={{ padding: "10px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={product.image} width={100} height={100} alt="" />
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>{product.title}</Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Quantity: {product.quantity}</Typography>
                  </Box>
                </Link>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <IconButton onClick={() => removeProduct(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <EditCartProductMenu setCart={setCart} id={product.id} quantity={product.quantity} />
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Cart;
