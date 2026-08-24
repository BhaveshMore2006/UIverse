import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { generateController } from '../controllers/generate.controller';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // We assume the directory exists or we should create it.
    // Given our constraints, we'll use a simple fallback to a temp dir or ensure it exists.
    cb(null, path.join(__dirname, '../../uploads/wireframes'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.post('/', upload.single('wireframe'), generateController);

export default router;
