import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getProduct } from "../api";

function Checkout() {
  const [checkout, setCheckout] = useState(null)

  useEffect(() => {
    async function gp() {
      const cart = JSON.parse(window.localStorage.getItem('cart')).products
      const products = await Promise.all(
        cart.map(async product => {
          const p = await getProduct(product.productId);
          return { id: p.id, image: p.image, price: p.price, title: p.title, quantity: product.quantity }
        })
      )
      setCheckout(products);
    }
    gp();
  }, [])


  return (
    <>
      <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center' }}>Cart Summary</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightgray', padding: '15px' }}>
        {checkout && checkout.map(product => {
          return (
            <Box key={product.productId} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: '40px' }}>
                <Typography variant="h5">{product.quantity}</Typography>
                <Box sx={{ maxWidth: '700px' }}>
                  <Typography variant="h5">{product.title}</Typography>
                  <Box sx={{ display: 'flex', gap: '15px' }}>
                    <Box component='img' src={product.image} sx={{ width: '25px', height: '25px' }} />
                    <Typography variant="h6">ea. ${product.price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="h5">${(product.price * product.quantity).toFixed(2)}</Typography>
            </Box>
          )
        })}
        <Divider />
        <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          Total: ${checkout && (checkout.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0)).toFixed(2)}
        </Typography>
      </Box >
    </>
  )
}
export default Checkout;