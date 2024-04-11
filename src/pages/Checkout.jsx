import { Box, Button, Divider, IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CloseIcon from '@mui/icons-material/Close'
import { getProduct } from "../api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [checkout, setCheckout] = useState(null)
  const [total, setTotal] = useState(0);
  const [sbOpen, setSbOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setSbOpen(true)
    setTimeout(() => {
      window.localStorage.removeItem('cart')
      navigate('/')
    }, 3000)
  }

  const handleClose = (e, r) => {
    if (r === 'clickaway') {
      return;
    }
    setSbOpen(false)
  }

  const action = (
    <>
      <IconButton onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  )

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
      setTotal(products.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0))
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
          Total: ${total !== null && total !== 0 && total.toFixed(2)}
        </Typography>
      </Box >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ textTransform: 'uppercase' }} size="large" variant="contained" onClick={handleClick}>buy now</Button>
      </Box>
      <Snackbar
        open={sbOpen}
        onClose={handleClose}
        message={`Your purchase of \$${total.toFixed(2)} has been made! You will be redirected to the homepage soon.`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={action}
        autoHideDuration={3000} />
    </>
  )
}
export default Checkout;