import { getCart } from "./api";

async function createCart() {
  // const jsonObj = { id: 1, userId: id, products: [] };
  // const json = JSON.stringify(jsonObj);
  // return json;
  const json = await getCart();
  window.localStorage.setItem('cart', JSON.stringify(json))
}

export async function addToCart(id) {
  !window.localStorage.getItem('cart') && await createCart();
  let cart = window.localStorage.getItem('cart')
  cart = JSON.parse(cart)
  let cartProds = cart.products
  let prodObj = cartProds.find(prod => prod.productId === id);
  if (prodObj) {
    prodObj.quantity++;
  }
  else {
    cartProds.push({ productId: id, quantity: 1 });
  }
  window.localStorage.setItem('cart', JSON.stringify(cart))
  // TODO: if db is implemented, add product to db cart
}