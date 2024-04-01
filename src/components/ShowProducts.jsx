import Grid from "@mui/material/Unstable_Grid2";
import ProductPreview from "./ProductPreview";
import { getProducts } from "../api";
import { useEffect } from "react";
import { useState } from "react";

function ShowProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function gp() {
      const json = await getProducts();
      setProducts(json);
    }
    gp();
  }, []);

  return (
    <>
      <h3>All products</h3>
      <Grid container spacing={3}>
        {products.length > 0 && products.map(product => <ProductPreview key={product.id} product={product} />)}
      </Grid>
    </>
  );
}

export default ShowProducts;
