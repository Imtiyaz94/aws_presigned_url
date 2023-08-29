configDotenv();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ImageRoutes from './routes/getURL.js';
import { configDotenv } from 'dotenv';


const app = express();
const port = process.env.PORT;
app.use(cors());
// Body-parser middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Setup
mongoose.connect(`${process.env.MONGODB_URL}/imageUploader`, {
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
