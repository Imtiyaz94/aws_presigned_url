import s3 from '../utils/AwsConn.js';
import Image from '../models/imageSchema.js';
import axios from 'axios';

export const uploadFile = async (res, url, key) => {
	const ext = key.split('.')[1];

	console.log("key", url);
	let response = await axios.get(url, { responseType: 'arraybuffer' }).then((res) => {
		console.log('res', res.data.data);
		return res.data.data;
	}).catch((error) => {
		// console.error('Error:', error);
		console.error('Status:', error.response.status);
		console.error('Data:', error.response.data);
		// console.log('err in axios call', err.config);
	});
	// Upload the image to S3 using the pre-signed URL
	const params = {
		// Bucket: process.env.AWS_BUCKET,
		Bucket: "demoawsurl",
		Key: key,
		Body: response,
		ContentType: `image/${ext}`,
		// ACL: 'public-read',
	};

	const putObject = await s3.getSignedUrl('putObject', params, async (error, data) => {
		if (error) {
			console.error('Error uploading image:', error);
			return res.status(500).send('Error uploading image');
		}
		return data;
		// console.log("presigned data", data);
	});
	// Save image details to MongoDB
	const imageUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
	const image = new Image({
		key,
		url: imageUrl,
	});
	return await image.save();

	// return res.send(200).json({ message: "Successfully uploaded image", data: putObject, });
	// return await s3.getSignedUrl('putObject', params);
};
