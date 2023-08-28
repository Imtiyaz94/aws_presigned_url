import Image from '../models/imageSchema.js';

export const showImage = async (req, res) => {
	const image = await Image.find();
	res.status(200).json({ 'message': "Successfull", data: image });
};