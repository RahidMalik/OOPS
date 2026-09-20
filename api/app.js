import express, { json } from "express";
//Routes
import authrouter from "./auth/route/auth.route.js";
import userRouter from "./user/router/user.route.js";
import Subscription_Router from "./subcription/route/subscription.route.js";
//export express
const app = express();
app.use(express.json());
// home route server check
app.get('/', (req, res) => {
    res.send("server is starting now")
});

// auth routes

// e.s => api/v1/auth/signup
app.use('/api/v1/auth', authrouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', Subscription_Router)

// server listening port
app.listen(3000, () => {
    console.log("server is runing on port:- Click On IT http://localhost:3000");
})
export default app;