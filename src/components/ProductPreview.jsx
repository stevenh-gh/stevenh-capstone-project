import { Box, Paper } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { AddShoppingCart } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { addToCart } from "../helpers";

function ProductPreview({ product, token }) {
  function handleClick(id, title) {
    addToCart(id)
    enqueueSnackbar(`Added ${title} to cart`);
  }
  return (
    <Grid xs={3}>
      <Paper sx={{ height: "100%", display: "flex", justifyContent: 'space-between', flexDirection: 'column', alignItems: "center" }}>
        <Link to={`/product/${product.id}`}>
          <Box sx={{ padding: "10px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={product.image} width={100} height={100} alt="" />
            <Typography variant="body1" sx={{ textAlign: 'center' }}>{product.title} - ${product.price}</Typography>
          </Box>
        </Link>
        {token &&
          <IconButton onClick={() => handleClick(product.id, product.title)}>
            <AddShoppingCart />
          </IconButton>
        }
        <Typography>
          <SnackbarProvider />
        </Typography>
      </Paper>
    </Grid>
  );
}

export default ProductPreview;
