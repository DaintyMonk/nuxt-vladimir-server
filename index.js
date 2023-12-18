const express = require('express');
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const bodyParser = require("body-parser");
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
app.use("/auth/", authRouter);

app.use((error, req, res, next) => {
	console.log(error);
	const yakStatus = error.statusCode || 500;
	const yakMessage = error.message;
	const yakData = error.data;
	res.status(yakStatus).json({ message: yakMessage, data: yakData });
});

const MONGOOSE_URI = `mongodb+srv://fakenroutes_capital_root:B7eSz9LfvQxzKa2y@cluster0.8fnlfei.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(MONGOOSE_URI)
	.then((result) => {
		app.listen(PORT, '0.0.0.0', () => {
			console.log(`Server started on port:${PORT}`);
		});
	})
	.catch((err) => console.log(err));