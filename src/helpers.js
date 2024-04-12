function createCart(id) {
  const jsonObj = { id: 1, userId: id, products: [] };
  const json = JSON.stringify(jsonObj);
  return json;
}

export function addToCart(id) {
  // !window.localStorage.getItem('cart') && window.localStorage.setItem('cart', createCart(id));
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