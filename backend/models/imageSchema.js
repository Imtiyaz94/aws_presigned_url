import mongoose from 'mongoose';

// Define Image Schema
const imageSchema = new mongoose.Schema({
	key: String,
	url: String,
});
const Image = mongoose.model('Image', imageSchema);
export default Image;