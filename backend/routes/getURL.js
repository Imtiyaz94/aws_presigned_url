import express from 'express';
import { showImage } from '../controllers/showImage.js';
import { getPresignedUrls } from '../controllers/getPresignedUrls.js';
import { uploadFile } from '../controllers/uploadFile.js';
const router = express.Router();

router.get('/image', showImage);

router.get('/getPresignedUrls', getPresignedUrls);

router.put('/upload/:key', uploadFile);

export default router;