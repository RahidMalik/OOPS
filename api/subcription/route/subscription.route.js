import { Router } from "express";

const Subscription_Router = Router();

Subscription_Router.get('/', (req, res) => res.send({ title: "GEt all subscription" }));
Subscription_Router.get('/:id', (req, res) => res.send({ title: "GEt all subscription details" }));
Subscription_Router.post('/', (req, res) => res.send({ title: "create subscription" }));
Subscription_Router.put('/:id', (req, res) => res.send({ title: "Update subscription" }));
Subscription_Router.delete('/:id', (req, res) => res.send({ title: " delete subscription" }));
Subscription_Router.get('/user/:id', (req, res) => res.send({ title: "Get all users subscription" }));
Subscription_Router.put('/:id/cancel', (req, res) => res.send({ title: " cancel subscription" }));
Subscription_Router.get('/upcoming-renewals', (req, res) => res.send({ title: "upcoming renewals subscription" }));


export default Subscription_Router;