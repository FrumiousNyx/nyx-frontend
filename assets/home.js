document.addEventListener("DOMContentLoaded", async () => {
    const featuredList = document.getElementById("featured-list");
    if (!featuredList) return;

    try {
        const products = await fetchHomeProducts();
        featuredList.innerHTML = "";

        if (products.length === 0) {
            featuredList.innerHTML = "<p>No bags featured yet.</p>";
            return;
        }

        products.forEach(p => {
            const card = document.createElement("a");
            card.href = `product.html?id=${p.id}`;
            card.className = "nyx-card";
            card.innerHTML = `
                <img src="./assets/images/${p.image_url}" alt="${p.name}">
                <div class="nyx-card-body">
                    <h3>${p.name}</h3>
                    <p>Rp ${p.price.toLocaleString('id-ID')}</p>
                </div>
            `;
            featuredList.appendChild(card);
        });
    } catch (err) {
        featuredList.innerHTML = "<p>Error loading products.</p>";
    }
});