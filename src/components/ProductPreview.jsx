import { Box, Paper } from "@mui/material";

import { AddShoppingCart } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function ProductPreview({ product }) {
  return (
    <Grid xs={3}>
      <Paper sx={{ height: "100%", display: "flex", justifyContent: 'space-between', flexDirection: 'column', alignItems: "center" }}>
        <Link to={`/product/${product.id}`}>
          <Box sx={{ padding: "10px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={product.image} width={100} height={100} alt="" />
            <Typography variant="body1" sx={{ textAlign: 'center' }}>{product.title} - ${product.price}</Typography>
          </Box>
        </Link>
        <Box onClick={() => console.log(product.id)}>
          <AddShoppingCart />
        </Box>
      </Paper>
    </Grid>
  );
}

export default ProductPreview;
