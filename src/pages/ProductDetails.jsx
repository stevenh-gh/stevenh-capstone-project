import { useEffect, useState } from "react";

import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getProduct } from "../api";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function gp() {
      const json = await getProduct(id);
      setProduct(json);
    }
    gp();
  }, []);

  return (
    <>
      {product && (
        <>
          <img src={product.image} width={200} alt="" />
          <h3>{product.title} - {product.rating.rate}/5 ({product.rating.count})</h3>
          <h4>${product.price}</h4>
          <p>{product.description}</p>
          <Button onClick={() => console.log(id)} variant="contained" size="large">Add to cart <AddShoppingCart sx={{ marginLeft: '10px' }} /></Button>
        </>
      )}
    </>
  );
}

export default ProductDetails;
