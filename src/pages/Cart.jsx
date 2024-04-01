import { Box, Paper } from "@mui/material";
import { getCart, getProduct } from "../api";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function Cart() {
  const [cart, setCart] = useState(null);
  const [updateCart, setUpdateCart] = useState(null);

  useEffect(() => {
    // magic user id for now, should accept token
    async function gc() {
      const json = await getCart(1);
      // access 0th element for now, should only have one cart
      setCart(json[0]);
    }
    gc();
  }, []);

  useEffect(() => {
    async function gp() {
      if (cart) {
        const res = await Promise.all(
          cart.products.map(async product => {
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

  return (
    <>
      <Header txt={"Cart"} />
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
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Cart;
