const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: "drkrlxqea", // Variáveis de ambiente recomendadas
  api_key: "528781286888297",
  api_secret: "R9WoRYZsk4rA45MxVysjeBdIK64",
});

// Configuração do armazenamento no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Pasta onde os arquivos serão armazenados no Cloudinary
    format: async (req, file) => 'png', // Escolha do formato (opcional)
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Nome do arquivo
  },
});

// Configuração do Multer
const upload = multer({ storage });

module.exports = upload;
