import s3 from '../utils/AwsConn.js';
import Image from '../models/imageSchema.js';
import axios from 'axios';

export const uploadFile = async (url, key) => {
	const ext = key.split('.')[1];

	console.log("key", ext);
	let response = await axios.get(url, { responseType: 'arraybuffer' }).then((res) => {
		console.log('res', res.data.data);
		return res.data.data;
	}).catch((err) => {
		console.log('err in axios call', err.config);
	});
	console.log("data", response);
	// Upload the image to S3 using the pre-signed URL
	const params = {
		Bucket: process.env.AWS_BUCKET,
		Key: key,
		Body: response,
		ContentType: `image/${ext}`,
		ACL: 'public-read',
	};


	await s3.getSignedUrl('putObject', params, async (error, data) => {
		if (error) {
			console.error('Error uploading image:', error);
			return res.status(500).send('Error uploading image');
		}
		// console.log("presigned data", data);
		// Save image details to MongoDB
		const imageUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
		const image = new Image({
			key,
			url: imageUrl,
		});
		return await image.save();
	});

	// return await s3.getSignedUrl('putObject', params);
};
