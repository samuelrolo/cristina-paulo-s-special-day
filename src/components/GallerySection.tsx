import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const CLOUD_NAME = "dobhofsfz";
const UPLOAD_PRESET = "cristina_paulo_wedding";
const FOLDER = "cristina-paulo-wedding";

interface Photo {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

const GallerySection = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Buscar fotos usando a Client-Side Resource List API do Cloudinary
  const fetchPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const resp = await fetch(
        `https://res.cloudinary.com/${CLOUD_NAME}/image/list/cristina-paulo-wedding.json`,
        { cache: "no-store" }
      );
      if (resp.ok) {
        const data = await resp.json();
        const loaded: Photo[] = (data.resources || []).map((r: any) => ({
          public_id: r.public_id,
          secure_url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_800/${r.public_id}.${r.format}`,
          width: r.width,
          height: r.height,
        }));
        setPhotos(loaded);
      }
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    const interval = setInterval(fetchPhotos, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    let uploaded = 0;
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`"${file.name}" é demasiado grande. Máximo 10MB.`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", FOLDER);
      formData.append("tags", "cristina-paulo-wedding");

      try {
        const resp = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        if (resp.ok) {
          const data = await resp.json();
          const newPhoto: Photo = {
            public_id: data.public_id,
            secure_url: data.secure_url,
            width: data.width,
            height: data.height,
          };
          setPhotos((prev) => [newPhoto, ...prev]);
          uploaded++;
        } else {
          const errData = await resp.json().catch(() => ({}));
          console.error("Erro Cloudinary:", errData);
          toast.error(`Erro ao carregar "${file.name}".`);
        }
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        toast.error(`Erro ao carregar "${file.name}".`);
      }

      setUploadProgress(Math.round(((uploaded) / files.length) * 100));
    }

    if (uploaded > 0) {
      toast.success(
        uploaded === 1
          ? "Foto partilhada com sucesso!"
          : `${uploaded} fotos partilhadas com sucesso!`
      );
    }

    setUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="wedding-subheading text-xs md:text-sm mb-4">OS NOSSOS MOMENTOS</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">Galeria</h2>
            <div className="wedding-divider mx-auto mb-8" />
          </div>

          <div className="text-center mb-8">
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Partilhem os vossos momentos connosco! Carreguem as vossas fotos e façam parte desta memória especial.
            </p>

            <div className="inline-block">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary text-sm tracking-[0.2em] uppercase font-light hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={18} />
                {uploading ? "A carregar..." : "PARTILHAR FOTOS"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/heic,.heic"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-2">JPG, PNG ou HEIC. Máximo 10MB por foto</p>
            </div>

            {uploading && uploadProgress > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{uploadProgress}%</p>
              </div>
            )}
          </div>

          {/* Galeria de fotos */}
          <div className="mt-12">
            {loadingPhotos ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : photos.length === 0 ? (
              <div className="border border-dashed border-primary/30 rounded-lg p-12 text-center">
                <ImageIcon className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-muted-foreground mb-2">Ainda sem fotos</p>
                <p className="text-xs text-muted-foreground">
                  Sejam os primeiros a partilhar um momento! Carreguem as vossas fotos acima.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <div
                    key={photo.public_id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.secure_url}
                      alt="Foto da galeria"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Modal de visualização */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedPhoto.secure_url}
              alt="Foto ampliada"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
