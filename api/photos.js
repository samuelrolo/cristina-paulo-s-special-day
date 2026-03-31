import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Listar recursos da pasta cristina-paulo-wedding
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "cristina-paulo-wedding/",
        max_results: 500,
      });

      // Ordenar por data de criação (mais recentes primeiro)
      const photos = result.resources
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((photo) => ({
          public_id: photo.public_id,
          secure_url: photo.secure_url,
          width: photo.width,
          height: photo.height,
          created_at: photo.created_at,
        }));

      res.status(200).json({ photos });
    } catch (error) {
      console.error("Erro ao listar fotos:", error);
      res.status(500).json({ error: "Erro ao listar fotos" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
