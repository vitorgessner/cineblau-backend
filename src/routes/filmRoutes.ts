import { Router } from 'express';
import { getAllFilms, getAllFilmsWithDetails, register } from '../controllers/filmController.js';
import multer from 'multer';

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.split('.')[0];
        const ext = file.originalname.split('.')[1];

        const suffix = Date.now() + '-' + Math.round(Math.random() * 10000);
        cb(null, originalName + '-' + suffix + '.' + ext);
    },
});

const upload = multer({ storage });

router.get('/', getAllFilms);
router.get('/detailed', getAllFilmsWithDetails);
router.post('/register', upload.single('poster'), register);

export default router;
