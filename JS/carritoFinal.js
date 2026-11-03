/* 01-11-2026 08h47 carrito   */

const listaProductos = document.querySelector(".lista-productos");
const listaCarrito = document.querySelector(".lista-carrito");
const vaciar = document.getElementById("vaciar");

const products = [
  {
    id: 1,
    name: "Tablette",
    price: 500,

    icon: "🔲",
  },
  {
    id: 2,
    name: "Pc portable",
    price: 1200,

    icon: "💻",
  },
  {
    id: 3,
    name: "Chargeur",
    price: 100,

    icon: "🔌",
  },
];

let cart = [];

// AJOUTER AU PANIER

function addToCart(id) {
  let product = products.find(function (product) {
    return product.id === id;
  });

  //Comprobar si el producto ya existe

  let existe = cart.find(function (product) {
    return product.id === id;
  });

  if (existe) {
    existe.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  renderCart();
  saveCart();
}

// AUMENTAR CANTIDAD - AUGMENTER LA QNTITE

function increaseaQuantity(id) {
  let product = cart.find(function (product) {
    return product.id === id;
  });

  product.quantity++;

  renderCart();
  saveCart();
}

// DISMINUIR CANTIDAD - DIMINUER LA QNTITE

function decreaseQuantity(id) {
  let product = cart.find(function (product) {
    return product.id === id;
  });

  product.quantity--;

  if (product.quantity === 0) {
    removeFromCart(product.id);
    return;
  }

  renderCart();
  saveCart();
}

// ENLEVER DU PANIER
function removeFromCart(id) {
  cart = cart.filter(function (product) {
    return product.id !== id;
  });
  renderCart();
  saveCart();
}

//FAIRE LE TOTAL

function total() {
  let totalCart = cart.reduce(function (acc, product) {
    return acc + product.price * product.quantity;
  }, 0);
  return totalCart;
}


// VIDER LE PANIER

function clearCart() {
  cart = [];
  renderCart();
  saveCart();
}

// MONTRER LES PRODUITS


function renderProducts() {
  listaProductos.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    const div = document.createElement("div");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const icon = document.createElement("span");
    const agregar = document.createElement("button");

    name.innerText = product.name;
    price.innerText = product.price + " €";
    icon.innerText = product.icon;
    agregar.innerText = "Ajouter au panier";

    div.appendChild(icon);
    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(agregar);
    listaProductos.appendChild(div);

    agregar.addEventListener("click", function () {
      addToCart(product.id);
    });

    icon.classList.add("icon");
    price.classList.add("price");
    agregar.classList.add("btn");
  }
}
renderProducts();

// MONTRER LE PANIER

function renderCart() {
  listaCarrito.innerHTML = "";

  if (cart.length === 0) {
    const p = document.createElement("p");
    p.innerText = "Ton panier est vide. ¡Ajoute un produit pour commencer!";
    listaCarrito.appendChild(p);
  }

  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];

    const div = document.createElement("div");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const quantity = document.createElement("span");
    const subtotal = document.createElement("span");

    const aumentar = document.createElement("button");
    const disminuir = document.createElement("button");
    const borrar = document.createElement("button");

    name.innerText = product.name;
    price.innerText = product.price + " €" + " / unité";
    quantity.innerText = product.quantity;
    aumentar.innerText = "+";
    disminuir.innerText = "-";
    subtotal.innerText = "Subtotal: " + product.price * product.quantity + " €";
    borrar.innerText = "Enlever";

    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(disminuir);
    div.appendChild(quantity);
    div.appendChild(aumentar);
    div.appendChild(subtotal);
    div.appendChild(borrar);
    listaCarrito.appendChild(div);

    disminuir.addEventListener("click", function () {
      decreaseQuantity(product.id);
    });
    aumentar.addEventListener("click", function () {
      increaseaQuantity(product.id);
    });

    borrar.addEventListener("click", function () {
      removeFromCart(product.id);
    });

    name.classList.add("name");
    price.classList.add("price");
    disminuir.classList.add("disminuir");
    quantity.classList.add("quantity");
    aumentar.classList.add("aumentar");
    subtotal.classList.add("subtotal");
    borrar.classList.add("btn");
  }
  document.getElementById("total").innerText = "Total: " + total() + " €";
}

vaciar.addEventListener("click", function () {
  clearCart();
});

// SAUVEGARDE DES ARTICLES


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// CHARGEMENT DES ARTICLES


function chargeCart() {
  const data = localStorage.getItem("cart");

  if (data) {
    cart = JSON.parse(data);
  }
  renderCart();
}
chargeCart();
