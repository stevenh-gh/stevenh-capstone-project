import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

function ProductPreview({ product }) {
  return (
    <Grid xs={3}>
      <Paper sx={{ height: "100%", display: "flex", alignItems: "center" }}>
        <Link to={`/product/${product.id}`}>
          <Box sx={{ padding: "10px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={product.image} width={100} height={100} alt="" />
            <Typography variant="body1" sx={{ textAlign: 'center' }}>{product.title} - ${product.price}</Typography>
          </Box>
        </Link>
      </Paper>
    </Grid>
  );
}

export default ProductPreview;
