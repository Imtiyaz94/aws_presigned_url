import multer from 'multer';

// Set up Multer middleware with S3 storage
multer({
	storage: multerS3({
		s3,
		bucket: 'veniqaaws',
		acl: 'public-read', // Adjust permissions as needed
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: (req, file, cb) => {
			cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
		},
	}),
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });