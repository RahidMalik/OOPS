const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { z } = require('zod');

const stripe = require('stripe')('sk_test_51T5j6HRsngja9SSo8y1GE2y3EVFVsqf12YKMFzCiERWGDqzuoDGP5UMa4jyBzwZ3Tm0tmsNtCQIelrq2EKbN1JLN00zHrRzLWa')
const { v4: uuidv4, v4 } = require('uuid')


//middleware
const app = express()
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(helmet())
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
// listen
app.listen(3000, () => console.log("server is listning http://localhost:3000"));