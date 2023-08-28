import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ImageRoutes from './routes/getURL.js';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 6000;
app.use(cors());
// Body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// MongoDB Setup
mongoose.connect('mongodb://localhost:27017/imageUploader', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
	res.json({ "message": "This is AWS Presigned URL Testing" });
});
app.use('/aws', ImageRoutes);


// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
