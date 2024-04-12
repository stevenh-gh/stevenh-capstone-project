// const URL = "https://fakestoreapi.com";
const URL = "/api";

export async function getProducts() {
  try {
    const res = await fetch(`${URL}/products`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export async function login(loginData) {
  try {
    const res = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export async function signup(signupData) {
  try {
    const res = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    const res = await fetch(`${URL}/auth/me`, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })
    const json = await res.json()
    return json
  } catch (err) {
    console.log(err)
  }
}

// accepts userid for now, should accept token
// export async function getCart(userId) {
export async function getCart() {
  try {
    const res = await fetch(`${URL}/carts/user/`, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${URL}/products/${id}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${URL}/products/categories`)
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err)
  }
}
