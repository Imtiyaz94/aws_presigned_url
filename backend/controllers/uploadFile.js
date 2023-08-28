import s3 from '../utils/AwsConn.js';
import Image from '../models/imageSchema.js';
import axios from 'axios';

export const uploadFile = async (req, res) => {
	const { key } = req.params;
	const url = req.body;
	// const { buffer } = req.file;
	// const file = (await axios.get(url)).data;
	const filename = `${key}`;
	console.log("url", req.body);


	// Upload the image to S3 using the pre-signed URL
	const params = {
		Bucket: 'veniqaaws',
		Key: filename,
		Body: req.body,
		ContentType: 'image/jpeg',
		ACL: 'public-read',
	};

	s3.getSignedUrl('putObject', params, async (error, data) => {
		if (error) {
			console.error('Error uploading image:', error);
			return res.status(500).send('Error uploading image');
		}
		// let response = await axios.get(data, { responseType: 'arraybuffer' }).then((res) => {
		// 	console.log('res', res.data.data);
		// 	return res.data.data;
		// }).catch((err) => {
		// 	console.log('err in axios call', err.config);
		// });
		console.log("data", data);
		// Save image details to MongoDB
		const imageUrl = `https://veniqaaws.s3.ap-south-1.amazonaws.com/${key}`;
		const image = new Image({
			key,
			url: imageUrl,
		});
		await image.save();

		res.status(200).json({ "message": 'Image uploaded successfully', data: image });
	});
};




// app.put('/upload', upload.single('image'), (req, res) => {
// 	// 	const bodyChunk = [];
// 	// 	console.log('query', req.query);
// 	// 
// 	// 	req.on('data', (chunk) => {
// 	// 		bodyChunk.push((chunk));
// 	// 	});
// 	// 
// 	// 	req.on('end', async () => {
// 	// 		const imgBuffer = Buffer.concat(bodyChunk);
// 	// 		const contentType = req.headers['content-type'];
// 	// 		const filename = `uploads/${Date.now().toString()}.jpg`;
// 	// 		console.log('imagebuffer', imgBuffer, filename);
// 	// 
// 	// 		const params = {
// 	// 			Bucket: 'microcosmworkspoc',
// 	// 			Key: filename,
// 	// 			Body: imgBuffer,
// 	// 			// ContentType: "image/jpeg",
// 	// 			ContentType: 'application/octet-stream', // Set the content type
// 	// 			// ContentType: 'application/x-www-form-urlencoded; charset=UTF-8',
// 	// 			ACL: 'public-read',
// 	// 		};
// 	// 
// 	// 		try {
// 	// 			// const url = s3.createPresignedPost(params);
// 	// 			const resp = s3.getSignedUrl('putObject', params);
// 	// 			// console.log("resp", resp);
// 	// 			res.json({ message: 'Image uploaded successfully', data: resp });
// 	// 		} catch (error) {
// 	// 			console.error('Error uploading image:', error);
// 	// 			res.status(500).json({ error: 'Unable to upload image' });
// 	// 		}
// 	// 
// 	// 	});
// 
// 	// using multer
// 	if (!req.file) {
// 		return res.status(400).json({ error: 'No file provided' });
// 	}
// 	res.json({ message: 'Image uploaded successfully' });
// 
// });
