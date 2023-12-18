const express = require('express');
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4025;
const cookieParser = require('cookie-parser');
const { coockie_secret } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(cors({
	origin: ['http://localhost:3000', 'https://test.com'],
	credentials: true
}));

app.use(cookieParser(coockie_secret));
app.use('/auth/', authRouter);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

const MONGOOSE_URI = `mongodb+srv://daintymonk:EsmPZKO3gViaYdFC@cluster0.oqpwwmn.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(MONGOOSE_URI)
	.then((result) => {
		app.listen(PORT, '0.0.0.0', () => {
			console.log(`Server started on port:${PORT}`);
		});
	})
	.catch((err) => console.log(err));