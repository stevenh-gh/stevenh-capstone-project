import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../api";
import ProductPreview from "./ProductPreview";

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
      <Grid2 container>
        {products.length > 0 && products.map(product => <ProductPreview key={product.id} product={product} />)}
      </Grid2>
    </>
  );
}

export default ShowProducts;
