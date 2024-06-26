import { Button, TextField, Typography } from "@mui/material"
import { SnackbarProvider, enqueueSnackbar } from "notistack"

import EditIcon from '@mui/icons-material/Edit'
import { Menu } from "@mui/material"
import { MenuItem } from "@mui/material"
import { useState } from "react"

function EditCartProductMenu({ id, quantity, setCart }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [productQuantity, setProductQuantity] = useState(quantity)
  const open = Boolean(anchorEl)

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
    if (quantity !== productQuantity) {
      let cart = window.localStorage.getItem('cart');
      cart = JSON.parse(cart);
      let cartProds = cart.products;
      let prodObj = cartProds.find(prod => prod.productId === id);
      if (prodObj) {
        prodObj.quantity = productQuantity
      }
      window.localStorage.setItem('cart', JSON.stringify(cart))
      setCart(window.localStorage.getItem('cart'))
      enqueueSnackbar(`Successfully updated the quantity to ${prodObj.quantity}`);
    }
  }

  const handleInput = e => {
    console.log(e.target.value)
    let val = Number(e.target.value);
    val > 1 && setProductQuantity(val);
  }

  const enterKeyDown = e => {
    if (e.code === 'Enter') {
      handleClose(e)
    }
  }

  return (
    <div>
      <Button
        id="basic-menu"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <EditIcon />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onKeyDown={enterKeyDown}>
          <TextField onChange={handleInput} inputProps={{ type: 'number', defaultValue: quantity }} />
        </MenuItem>
      </Menu>
      <Typography>
        <SnackbarProvider />
      </Typography>
    </div>
  )
}

export default EditCartProductMenu