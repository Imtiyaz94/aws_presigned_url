import s3 from '../utils/AwsConn.js';


export const getPresignedUrls = async (req, res) => {

	const filename = `uploads${Date.now().toString()}`;
	const fileurls = [];
	console.log('query', req.body);

	const params = {
		Bucket: 'veniqaaws',
		Key: filename,
		ContentType: 'image/jpeg', // Set the content type
		Expires: 3600, // URL expiration time in seconds
	};
	s3.getSignedUrl('putObject', params, (err, url) => {
		if (err) {
			console.error('Error generating pre-signed URL:', err);
			return res.status(500).json({ error: 'Unable to generate pre-signed URL' });
		}
		req.query = url;
		res.json({ success: true, message: 'AWS SDK S3 Pre- signed urls generated successfully', urls: url, keys: filename });
	});

};