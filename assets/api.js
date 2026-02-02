const SUPABASE_URL = "https://wvvjlrfbseyieznqtptu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hMsFMuUOO_bnsmJpPyyZOA_CiPxTFzB";

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

// Ambil SEMUA produk
async function fetchProducts() {
  const url = `${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`;
  const res = await fetch(url, { headers: supabaseHeaders });
  if (!res.ok) throw new Error("Gagal mengambil produk");
  return await res.json();
}

// Ambil produk BERDASARKAN ID
async function fetchProductById(id) {
  const url = `${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`;
  const res = await fetch(url, { headers: supabaseHeaders });
  if (!res.ok) throw new Error("Gagal mengambil detail produk");
  const data = await res.json();
  return data[0] || null;
}

// BARU: Ambil produk FEATURED (untuk Home)
async function fetchFeaturedProducts() {
  const url = `${SUPABASE_URL}/rest/v1/products?is_featured=eq.true&select=*&limit=3`;
  const res = await fetch(url, { headers: supabaseHeaders });
  if (!res.ok) throw new Error("Gagal mengambil produk unggulan");
  return await res.json();
}