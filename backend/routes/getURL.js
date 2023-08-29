import express from 'express';
import { showImage } from '../controllers/showImage.js';
import { getPresignedUrls } from '../controllers/getPresignedUrls.js';

const router = express.Router();

router.get('/image', showImage);

router.get('/getPresignedUrls', getPresignedUrls);

export default router;