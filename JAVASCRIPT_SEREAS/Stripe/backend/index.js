const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { z } = require('zod');
configDotenv()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const { configDotenv } = require('dotenv');

class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode
        this.details = details
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
};

class NotFoundError extends AppError {
    constructor(message = 'Not found') {
        super(message, 404)
    };
};

class ValidationError extends AppError {
    constructor(message = 'Validation Error') {
        super(message);
    };
};

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
};

//middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
// routes
app.get('/', async (req, res) => {
    res.send('<p>Server is sleeping</p>');
});

//Stripe route
app.post('/payment', async (req, res) => {
    let event;
    const { product, token } = req.body;
    console.log("Product:", product);
    console.log("Product price:", product.price);
    const idempotencyKey = uuidv4();
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })

        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `your name ${product.name}`,
        }, { idempotencyKey });


        res.status(200).json(charge);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message = "payment error" })
    };
});



app.use('/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
    let event;
    try {

    } catch (error) {

    }
});
// listen
app.listen(3000, () => console.log("server is listning http://localhost:3000"));