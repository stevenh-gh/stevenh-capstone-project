import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, getProduct } from "../api";
import Header from "../components/Header";

function Cart() {
  const [cart, setCart] = useState(null);
  const [updateCart, setUpdateCart] = useState(null);

  useEffect(() => {
    // magic user id for now, should accept token
    async function gc() {
      const json = await getCart(1);
      // access 0th element for now, should only have one cart
      setCart(json[0]);
    }
    gc();
  }, []);

  useEffect(() => {
    async function gp() {
      if (cart) {
        const res = await Promise.all(
          cart.products.map(async product => {
            const p = await getProduct(product.productId);
            return { ...p, quantity: product.quantity };
          }),
        );
        const updatedCart = { ...cart, products: res };
        setUpdateCart(updatedCart);
      }
    }
    gp();
  }, [cart]);

  return (
    <>
      <Header txt={"Cart"} />
      {/* updateCart && console.log(updateCart) */}
      {updateCart && updateCart.products.map(product => {
        return (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} width={100} alt="" />
              <p>{product.title}</p>
              <p>Quantity: {product.quantity}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
