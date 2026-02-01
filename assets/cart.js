const CART_KEY = "nyx_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addToCart(product, qty) {
  const items = getCart();
  const existing = items.find((i) => String(i.id) === String(product.id));
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      qty,
    });
  }
  saveCart(items);
}

function removeFromCart(id) {
  const items = getCart().filter((i) => String(i.id) !== String(id));
  saveCart(items);
  return items;
}

function updateCartItemQty(id, newQty) {
  let items = getCart();
  const idx = items.findIndex((i) => String(i.id) === String(id));
  if (idx === -1) return items;

  if (newQty <= 0) {
    // kalau 0 atau kurang, hapus item dari cart
    items.splice(idx, 1);
  } else {
    items[idx].qty = newQty;
  }

  saveCart(items);
  return items;
}
