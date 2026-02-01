// GANTI dua konstanta ini dengan data project Supabase kamu
const SUPABASE_URL = "https://wvvjlrfbseyieznqtptu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hMsFMuUOO_bnsmJpPyyZOA_CiPxTFzB";

async function fetchProducts() {
  const url = `${SUPABASE_URL}/rest/v1/products?select=*`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("Supabase products error:", res.status, await res.text());
    throw new Error("Failed to fetch products");
  }

  return await res.json();
}

async function fetchProductById(id) {
  const url = `${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("Supabase product error:", res.status, await res.text());
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data[0] || null;
}
