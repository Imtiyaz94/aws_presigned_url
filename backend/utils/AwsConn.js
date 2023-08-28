import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: '',
	secretAccessKey: '',
	region: 'ap-south-1',
	signatureVersion: 'v4',
});


const s3 = new AWS.S3();

export default s3;