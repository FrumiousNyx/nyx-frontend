document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const container = document.getElementById("product-detail-container");

    if (!productId || !container) return;

    try {
        // Panggil fungsi dari api.js
        const product = await fetchProductById(productId);

        if (!product) {
            container.innerHTML = "<h2 style='text-align:center; padding:100px;'>Product not found.</h2>";
            return;
        }

        container.innerHTML = `
            <div class="nyx-product-layout">
                <div class="nyx-product-media">
                    <img src="./assets/images/${product.image_url}" alt="${product.name}">
                </div>
                <div class="nyx-product-info">
                    <p style="color:#ff3f40; font-weight:700; text-transform:uppercase; font-size:12px;">${product.category}</p>
                    <h1>${product.name}</h1>
                    <p class="price-tag">Rp ${product.price.toLocaleString('id-ID')}</p>
                    <p style="color:#707072; margin-bottom:30px; line-height:1.6;">${product.description || 'Kualitas premium NYX untuk kenyamanan maksimal.'}</p>
                    
                    <div style="margin-bottom:20px;">
                        <label>Quantity:</label>
                        <input type="number" id="qty-input" value="1" min="1" style="padding:8px; width:60px; margin-left:10px;">
                    </div>

                    <button id="btn-add-cart" class="nyx-btn nyx-btn-primary" style="width:100%;">Add to Bag</button>
                </div>
            </div>
        `;

        document.getElementById("btn-add-cart").onclick = () => {
            const qty = parseInt(document.getElementById("qty-input").value);
            if (typeof addToCart === "function") {
                addToCart(product, qty);
                alert("Berhasil ditambahkan ke Bag!");
                if (typeof updateCartBadge === "function") updateCartBadge();
            }
        };

    } catch (err) {
        container.innerHTML = "<h2 style='text-align:center; padding:100px;'>Error connecting to database.</h2>";
    }
});