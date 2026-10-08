require('dotenv').config()
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit')
const { default: z } = require('zod')

class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message)
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
    constructor(details) {
        super('invalid Data', 400, details);
    };
};


const payLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, max: 10
});

const PRODUCTS = {
    p1: { name: 'Test Product', price: 10 },
    p2: { name: 'Second Product', price: 25 },
}

const paymentSchema = z.object({
    productId: z.string(),
    token: z.object({
        id: z.string(),
        email: z.string().email()
    }),
});


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
// app.post('/payment', async (req, res) => {
//     let event;
//     const { product, token } = req.body;
//     console.log("Product:", product);
//     console.log("Product price:", product.price);
//     const idempotencyKey = uuidv4();
//     try {
//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id,
//         })

//         const charge = await stripe.charges.create({
//             amount: product.price * 100,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `your name ${product.name}`,
//         }, { idempotencyKey });


//         res.status(200).json(charge);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message = "payment error" })
//     };
// });



app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
    )// fail hua to khud error handler tak jayga

    if (event.type === 'charge.succeeded') {
        console.log('Paid', event.data.object.id);
    }
    res.json({
        received: true
    });
});

app.post('/payment', payLimiter, asyncHandler(async (req, res) => {
    const { productId, token } = paymentSchema.parse(req.body);

    const product = PRODUCTS[productId]
    if (!product) throw new NotFoundError('Product Not Found')

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    });

    const charge = await stripe.charges.create({
        amount: product.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchase of ${product.name}`,
    }, { idempotencyKey: uuidv4() })

    res.status(200).json({
        id: charge.id,
        status: charge.status
    })
}));

// 404
app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} Not Found`))
})

//error ko apperror main convert karo
const normalizeError = (err) => {
    if (err instanceof AppError) return err
    if (err.name === 'ZodError') return new ValidationError(err.errors);

    switch (err.type) {
        case 'StripeCardError':
            return new AppError(err.message, 402)
        case 'StripeInvalidRequestError':
            return new AppError('Invalid payment Error', 400);
        case 'StripeSignatureVerificationError':
            return new AppError('Invalid webhook signature', 400)
        case 'StripeRateLimitError':
            return new AppError('too many req', 429)
        case 'StripeAuthenticationError':
            console.log('strope key invalid');
            return new AppError('Payment service error', 500)
    }

    const unknown = new AppError('Something went wrong', 500)
    unknown.isOperational = false // bug hai, hamari galti
    return unknown
}

app.use((err, req, res, next) => {
    const error = normalizeError(err)
    if (!error.isOperational) console.error(err);// sirf asli bug ka stack

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        ...(error.details && { details: error.details }),
        ...(process.env.NODE_ENV !== 'production' && {
            stack: err.stack
        })
    })
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('uncaught Excaption', err);
    process.exit(1)
})




// listen
app.listen(3000, () => console.log("server is listning http://localhost:3000"));