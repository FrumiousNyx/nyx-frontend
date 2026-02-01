document.addEventListener("DOMContentLoaded", async () => {
  console.log("Shop page ready");

  const container = document.getElementById("product-list");
  if (!container) return;

  try {
    const products = await fetchProducts();

    container.innerHTML = "";

    products.forEach((p) => {
      const card = document.createElement("article");
      card.className = "nyx-card";
      card.innerHTML = `
        <img src="./assets/images/${p.image_url || "tee-1.jpg"}" alt="${p.name}" />
        <div class="nyx-card-body">
          <h3>${p.name}</h3>
          <p>Rp ${p.price.toLocaleString("id-ID")}</p>
          <button class="nyx-btn nyx-btn-primary" data-id="${p.id}">View</button>
        </div>
      `;
      container.appendChild(card);
    });

    container.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-id]");
      if (!btn) return;
      const id = btn.getAttribute("data-id");
      window.location.href = `product.html?id=${encodeURIComponent(id)}`;
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Gagal memuat produk.</p>";
  }
});
