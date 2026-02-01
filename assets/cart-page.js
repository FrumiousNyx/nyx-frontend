document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("cart-items");
  const emptyEl = document.getElementById("cart-empty");
  const summaryEl = document.getElementById("cart-summary");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("cart-checkout");

  function renderCart() {
    const items = getCart();

    if (!items.length) {
      listEl.innerHTML = "";
      emptyEl.style.display = "block";
      summaryEl.style.display = "none";
      return;
    }

    emptyEl.style.display = "none";
    summaryEl.style.display = "block";

    listEl.innerHTML = "";
    let total = 0;

    items.forEach((item) => {
      const subtotal = item.price * item.qty;
      total += subtotal;

      const row = document.createElement("div");
      row.className = "nyx-cart-item";
      row.innerHTML = `
        <div class="nyx-cart-thumb">
          <img src="./assets/images/${item.image_url || "tee-1.jpg"}" alt="${item.name}" />
        </div>
        <div class="nyx-cart-info">
          <h3>${item.name}</h3>
          <p>Rp ${item.price.toLocaleString("id-ID")} / item</p>
          <div class="nyx-cart-qty">
            <button type="button" data-action="dec" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button type="button" data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="nyx-cart-actions">
          <span>Rp ${subtotal.toLocaleString("id-ID")}</span>
          <button type="button" data-action="remove" data-id="${item.id}">Remove</button>
        </div>
      `;
      listEl.appendChild(row);
    });

    totalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");

    if (action === "remove") {
      removeFromCart(id);
    } else if (action === "inc" || action === "dec") {
      const items = getCart();
      const item = items.find((i) => String(i.id) === String(id));
      if (!item) return;
      const delta = action === "inc" ? 1 : -1;
      const newQty = item.qty + delta; // boleh 0, nanti dihapus di updateCartItemQty
      updateCartItemQty(id, newQty);
    }

    renderCart();
  });

  checkoutBtn.addEventListener("click", () => {
    alert("Checkout dummy: order belum disimpan ke database.");
  });

  renderCart();
});
