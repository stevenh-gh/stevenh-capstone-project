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
      {products.length > 0 && products.map(product => <ProductPreview key={product.id} product={product} />)}
    </>
  );
}

export default ShowProducts;
