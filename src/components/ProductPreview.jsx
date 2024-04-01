import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

function ProductPreview({ product }) {
  return (
    <Grid>
      <Paper>
        <Link to={`/product/${product.id}`}>
          <Box>
            <img src={product.image} width={100} alt="" />
            <p>{product.title} - ${product.price}</p>
          </Box>
        </Link>
      </Paper>
    </Grid>
  );
}

export default ProductPreview;
