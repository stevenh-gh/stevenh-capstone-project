import { Button, Typography } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { AddShoppingCart } from "@mui/icons-material";
import { addToCart } from "../helpers";
import { getProduct } from "../api";
import { useParams } from "react-router-dom";

function ProductDetails({ token }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function gp() {
      const json = await getProduct(id);
      setProduct(json);
    }
    gp();
  }, []);

  function handleClick(product) {
    addToCart(product.id)
    enqueueSnackbar(`Added ${product.title} to cart!`)
  }

  return (
    <>
      <Typography>
        {product && (
          <>
            <img src={product.image} width={200} height={200} alt="" />
            {/* <h3>{product.title} - {product.rating.rate}/5 ({product.rating.count})</h3> */}
            <h3>{product.title}</h3>
            <h4>${product.price}</h4>
            <p>{product.description}</p>
            {token && <Button onClick={() => handleClick(product)} variant="contained" size="large">Add to cart <AddShoppingCart sx={{ marginLeft: '10px' }} /></Button>}
            <SnackbarProvider />
          </>
        )}
      </Typography>
    </>
  );
}

export default ProductDetails;
