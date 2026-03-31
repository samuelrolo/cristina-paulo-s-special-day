import { v2 as cloudinary } from "cloudinary";
import { IncomingForm } from "formidable";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new IncomingForm();
      const [fields, files] = await form.parse(req);

      const file = files.file?.[0];
      if (!file) {
        return res.status(400).json({ error: "Nenhum ficheiro foi enviado" });
      }

      // Ler o ficheiro
      const fileContent = fs.readFileSync(file.filepath);

      // Fazer upload para o Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        {
          folder: "cristina-paulo-wedding",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            throw error;
          }
          return result;
        }
      );

      // Usar uma Promise para esperar pelo resultado
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "cristina-paulo-wedding",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileContent);
      });

      res.status(200).json({
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      res.status(500).json({ error: "Erro ao fazer upload da foto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
