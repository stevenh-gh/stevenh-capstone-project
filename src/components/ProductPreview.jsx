import { Link } from "react-router-dom";

function ProductPreview({ product }) {
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} width={100} alt="" />
        <p>{product.title} - ${product.price}</p>
      </Link>
    </div>
  );
}

export default ProductPreview;
