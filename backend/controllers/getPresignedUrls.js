import { randomUUID } from 'crypto';
import s3 from '../utils/AwsConn.js';
import { uploadFile } from './uploadFile.js';


export const getPresignedUrls = async (req, res) => {
	const ext = (req.query.fileType).split('/')[1];
	const Key = `${randomUUID()}.${ext}`;
	console.log('query', ext);

	const params = {
		Bucket: process.env.AWS_BUCKET,
		Key: Key,
		ContentType: `image/${ext}`, // Set the content type
		Expires: 3600, // URL expiration time in seconds
	};
	// const url = await s3.getSignedUrl('putObject', params, (err, url) => {
	// 	if (err) {
	// 		console.error('Error generating pre-signed URL:', err);
	// 		return res.status(500).json({ error: 'Unable to generate pre-signed URL' });
	// 	}
	// 	req.query = url;
	// 	res.json({ success: true, message: 'AWS SDK S3 Pre- signed urls generated successfully', urls: url, keys: Key });
	// });

	const url = await s3.getSignedUrl('putObject', params);
	uploadFile(url, Key);
	res.json({ success: true, message: 'AWS SDK S3 Pre- signed urls generated successfully', url, key: Key });

};