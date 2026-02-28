const { body, validationResult } = require('express-validator');

const Food = require('../models/Food');
// const Order = require('../models/Order');
// const User = require('../models/User');
// const isLoggedIn = require('../middlewares/auth');

const isLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()) {
		return res.redirect('/auth/login');
	}
	next();
};

module.exports = function foodRoutes() {

	const router = require('express').Router();

	router.get('/', isLoggedIn, async (req, res, next) => {
		try {
			const foods = await Food.find();
			res.render('home', {
				foods: foods,
				title: " Hotel Transylvania | Home Page ",
				tagline: " Warm Welcome Guests! "
			});
		} catch(err) {
			next(err);
		}
	});

	router.post('/add-to-cart', async (req, res, next) => {
		try {

			const id = req.body.foodId.toString().trim();
			
			const food = await Food.findById(id);
			if(!food) {
				return res.json({
					success: false,
					message: "Out of stock"
				});
			}
			const existingFood = req.session.cart.find(f => f.id === id);
			if(existingFood) {
				existingFood.quantity += 1;
			} else {
				req.session.cart.push({
					id: food.id,
					name: food.name,
					price: food.price,
					quantity: 1,
					imageUrl: food.imageUrl
				});
			}
			res.json({
				success: true,
				cartCount: req.session.cart.length,
				message: "Item added to cart"
			});
			
		} catch(err) {
			next(err);
		}
	});

	router.get('/cart', async (req, res, next) => {
		try {

			const total = req.session.cart.reduce((sum, food) => {
				return sum + (food.price * food.quantity);
			}, 0);

			res.render('cart', {
				cart: req.session.cart,
				total: total.toFixed(2),
				title: "Hotel Transylvania | Warm Welcome"
			});
			
		} catch(err) {
			next(err);
		}
	});

	router.post('/update-cart/:id', [
		body('quantity')
		.trim()
		.escape()
		.isNumeric()
		.withMessage('Quantity must be Number')
	], async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				const errMsg = errors.array().map(error => error.msg);
				req.flash('error', errMsg);
				return res.redirect('/cart');
			}
			
			const id = req.params.id.toString().trim();
			const quantity = parseInt(req.body.quantity.trim());

			const food = req.session.cart.find(f => f.id === id);
			if(food) {
				if(quantity <= 0) {
					// remove item if quantity is -ve or 0
					req.session.cart = req.session.cart.filter(f => f.id !== id);
				} else {
					food.quantity = quantity;
				}
			}
			res.redirect('/cart');
			
		} catch(err) {
			next(err);
		}
	});

	router.post('/remove-from-cart/:id', async (req, res, next) => {
		try {
			const id = req.params.id.toString().trim();
			req.session.cart = req.session.cart.filter(f => f.id !== id);
			res.redirect('/cart');
			
		} catch(err) {
			next(err);
		}
	});

	return router;
};
