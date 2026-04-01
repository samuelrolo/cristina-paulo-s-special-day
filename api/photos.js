export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const CLOUD_NAME = "dobhofsfz";
  const API_KEY = "233463673412489";
  const API_SECRET = "4g8IIo-QblNV6L0fLnkiH790-e8";
  const TAG = "cristina-paulo-wedding";

  try {
    const url = `https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/tags/${TAG}?max_results=100`;
    const response = await fetch(url);
    const data = await response.json();

    const photos = (data.resources || []).map((r) => ({
      url: r.secure_url.replace(/\.(heic|heif)$/i, ".jpg"),
      name: r.display_name || r.public_id,
    }));

    return res.status(200).json({ photos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
