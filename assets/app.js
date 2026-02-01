document.addEventListener("DOMContentLoaded", () => {
  console.log("NYX frontend loaded");
});

/**
 * Tampilkan toast di pojok kanan atas
 * @param {string} message
 * @param {number} duration ms
 */
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
    <button aria-label="Close">&times;</button>
  `;

  const closeBtn = toast.querySelector("button");
  const remove = () => {
    toast.classList.add("nyx-toast-hide");
    setTimeout(() => toast.remove(), 150);
  };

  closeBtn.addEventListener("click", remove);

  container.appendChild(toast);

  setTimeout(remove, duration);
}
