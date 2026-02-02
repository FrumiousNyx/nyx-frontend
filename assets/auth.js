document.addEventListener("DOMContentLoaded", () => {
  if (!supabaseClient) {
    console.error("Supabase client not available");
    return;
  }

  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const msgEl = document.getElementById("auth-message");

  function setMessage(text, isError = false) {
    msgEl.textContent = text;
    msgEl.style.color = isError ? "#b91c1c" : "#6b7280";
  }

  // TAB SWITCH
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
    setMessage("");
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    setMessage("");
  });

  // REGISTER
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    const email = document.getElementById("register-email").value.trim();
    const password = document
      .getElementById("register-password")
      .value.trim();

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setMessage(error.message || "Register failed", true);
      return;
    }

    setMessage(
      "Registration successful. Check your email if confirmation is required."
    );
  });

  // LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    const email = document.getElementById("login-email").value.trim();
    const password = document
      .getElementById("login-password")
      .value.trim();

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setMessage(error.message || "Login failed", true);
      return;
    }

    setMessage("Login successful.");

    const user = data.user;
    if (user) {
      localStorage.setItem(
        "nyx_user",
        JSON.stringify({ id: user.id, email: user.email })
      );
    }

    if (typeof showToast === "function") {
      showToast("Logged in");
    }

    setTimeout(() => {
      window.location.href = "shop.html";
    }, 800);
  });
});
