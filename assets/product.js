document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const imgContainer = document.getElementById("product-image");
  const nameEl = document.getElementById("product-name");
  const priceEl = document.getElementById("product-price");
  const descEl = document.getElementById("product-desc");
  const qtyInput = document.getElementById("product-qty");
  const addBtn = document.getElementById("add-to-cart");

  if (!id) {
    nameEl.textContent = "Product not found";
    return;
  }

  try {
    const product = await fetchProductById(id);
    if (!product) {
      nameEl.textContent = "Product not found";
      return;
    }

    imgContainer.innerHTML = `
      <img src="./assets/images/${product.image_url || "tee-1.jpg"}" alt="${product.name}" />
    `;
    nameEl.textContent = product.name;
    priceEl.textContent = `Rp ${product.price.toLocaleString("id-ID")}`;
    descEl.textContent =
      product.description || "No description available.";

    addBtn.addEventListener("click", () => {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      addToCart(product, qty);
      if (typeof showToast === "function") {
        showToast("Added to cart");
      }
    });
  } catch (err) {
    console.error(err);
    nameEl.textContent = "Error loading product";
  }
});
