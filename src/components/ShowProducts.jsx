import Grid from "@mui/material/Unstable_Grid2";
import ProductPreview from "./ProductPreview";
import { getProducts } from "../api";
import { useEffect } from "react";
import { useState } from "react";

function ShowProducts({ filter }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function gp() {
      const json = await getProducts();
      setProducts(json);
    }
    gp();
  }, []);

  function displayProducts() {
    return (
      <>
        {!filter ? products.map(product => <ProductPreview key={product.id} product={product} />)
          : products.filter(product => product.category === filter).map(product => <ProductPreview key={product.id} product={product} />)}
      </>
    )

  }

  return (
    <>
      {console.log('in showprod', filter)}
      <h3>All products</h3>
      <Grid container spacing={3}>
        {products.length > 0 && displayProducts()}
      </Grid>
    </>
  );
}

export default ShowProducts;
