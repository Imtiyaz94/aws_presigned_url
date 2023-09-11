import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadFiles = () => {
	const [image, setImage] = useState([]);

	const uploadToS3 = async (e) => {
		const formData = new FormData(e.target);
		const file = formData.get('file');
		if (!file) {
			return null;
		}

		const fileType = encodeURIComponent(file.type);
		console.log('filetype', file);
		const data = await axios.get(`http://localhost:5000/aws/getPresignedUrls?fileType=${fileType}`).then((data) => {
			console.log("axios get", data.data);
			return data.data;
		}).catch((err) => {
			console.log(err);
		});
		const { url, key } = data;
		console.log('url', url,);
		const options = { headers: { 'Content-Type': fileType, } };
		await axios.put(url, file, options);

		return key;

	};
	const getImage = async () => {
		const { data } = await axios.get(`http://localhost:5000/aws/image`).then((data) => {
			// console.log(data.data);
			return data.data;
		}).catch((err) => {
			console.log(err);
		});
		console.log("get image", data);
		setImage(data);
		// console.log(url, key);
	};
	useEffect(() => {
		getImage();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await uploadToS3(e);
	};
	return (
		<div className="App">
			<h1>Image Upload</h1>
			<div className='upload'>
				<form onSubmit={(e) => handleSubmit(e)} action="">
					<input type="file" accept="image/*" name='file' />

					<button type="submit">Upload</button>
				</form>
			</div>
			<div className='image-list'>
				{
					image && image?.map((img) => {
						// console.log('image', img);
						return (
							<div key={img.key}>
								<img className='image' src={img.url} alt="uploaded images to shown here..." />
							</div>
						);
					})
				}
			</div>
		</div>
	);
};

export default UploadFiles;