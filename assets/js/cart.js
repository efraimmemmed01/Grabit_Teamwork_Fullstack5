

const cartItems = [
  { id: 1, name: "Women's Wallet", price: 70, quantity: 1 },
  { id: 2, name: "Rose Gold Earring", price: 80, quantity: 1 },
  { id: 3, name: "Apple", price: 12, quantity: 1 }
];

const cartBody = document.getElementById("cart-body");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const delivery = 20;

function renderCart() {
  cartBody.innerHTML = "";

  cartItems.forEach(item => {
    const row = document.createElement("tr");
 
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        ${item.quantity}
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </td>
      <td>$${item.price * item.quantity}</td>
      <td><button onclick="removeItem(${item.id})">X</button></td>
    `;

    cartBody.appendChild(row);
  });

  updateTotal();
}

function changeQty(id, change) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity < 1) item.quantity = 1;

  renderCart();
}

function removeItem(id) {
  const index = cartItems.findIndex(i => i.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCart();
  }
}

function updateTotal() {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  subtotalEl.textContent = subtotal;
  totalEl.textContent = subtotal + delivery;
}

renderCart();
