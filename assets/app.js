// Inisialisasi Supabase Global
const { createClient } = supabase;

const supabaseClient = createClient(
  "https://wvvjlrfbseyieznqtptu.supabase.co",
  "sb_publishable_hMsFMuUOO_bnsmJpPyyZOA_CiPxTFzB"
);

document.addEventListener("DOMContentLoaded", () => {
  console.log("NYX frontend loaded");
  updateUI();
});

// Fungsi untuk update tampilan Navbar & Cart Badge secara global
function updateUI() {
  const authAction = document.getElementById("auth-action");
  const user = JSON.parse(localStorage.getItem("nyx_user"));

  if (authAction) {
    if (user) {
      // tampilkan nama pendek + tombol logout
      authAction.innerHTML = `
        <span>${user.email.split("@")[0]}</span>
        <span style="opacity:.6;">Logout</span>
      `;
      authAction.onclick = logout;
    } else {
      authAction.textContent = "Login";
      authAction.onclick = () => {
        window.location.href = "auth.html";
      };
    }
  }

  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  // Pastikan getCart tersedia (dari cart.js)
  const items = typeof getCart === "function" ? getCart() : [];
  const count = items.reduce((total, item) => total + item.qty, 0);

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

async function logout() {
  try {
    await supabaseClient.auth.signOut();
  } catch (e) {
    console.error("Logout error:", e);
  }
  localStorage.removeItem("nyx_user");
  window.location.href = "index.html";
}

/* TOAST CLEAN */
function showToast(message, duration = 2000) {
  let container = document.querySelector(".nyx-toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "nyx-toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "nyx-toast";
  toast.innerHTML = `
    <span>${message}</span>
    <button type="button" aria-label="Close toast">&times;</button>
  `;

  const remove = () => {
    toast.classList.add("nyx-toast-hide");
    setTimeout(() => toast.remove(), 150);
  };

  toast.querySelector("button").addEventListener("click", remove);

  container.appendChild(toast);
  setTimeout(remove, duration);
}
