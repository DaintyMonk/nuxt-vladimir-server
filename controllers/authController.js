const User = require('../models/userModel');

async function Login(req, res, next) {
	try {
		res.json({ message: 'Login successful'});
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

async function SaveUser(req, res, next) {
	try {
		const { username, password } = req.body;

		const newUser = new User({ username, password });

		await newUser.save();

		res.status(201).json({ message: 'User saved successfully' });
	} catch (error) {
		console.error('Error', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

async function GetUsers(req, res, next) {
	try {
		const users = await User.find({});

		res.send(users);
	} catch (error) {
		console.error('Error', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

async function Register(req, res, next) {
	try {
		res.json({ message: 'Register successfully' });
	} catch (error) {
		console.error('Error', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	Login,
	Register,
	SaveUser,
	GetUsers
}