import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  dest: './uploads', // Specify the destination folder where the uploaded files will be stored
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 1024 * 1024, // Maximum file size in bytes (here, it's set to 1MB)
  },
  fileFilter: (req, file, callback) => {
    // Validate the file type, if required
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
    }
  },
};