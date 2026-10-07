// Whats “Higher Order Functions” ?

// The truth is that “Higher Order Functions” are extensively used in javascript and every programmer uses it without even knowing it.Other reality is that it is this concept that makes javascript suitable for functional programming.So a simple definition can be that Higher Order Functions are functions that can accept or return another function . I am now wondering whats Callback function then ??

// Callback and Higher Order Function
function salary(number) {
    return sum * 7
};
setTimeout(() => salary, 300);

const mysalaries = ["50", "40", "60", "20", "300", "400"];
mysalaries.filter(sal => sal > 50).filter(tex).map()


//  () => { }
// (func) => { }
// (func) => () => { }
// (func) => () => () => { }

const asyncHandler = (fn) => async (req, res, next) => {
    try {

        await fn(req, res, next)

    } catch (error) {
        console.log(error)
    }
}

// I have an async middleware in express, because I want to use await inside it, to clean up my code.

const express = require('express');
const app = express();

app.use(async (req, res, next) => {
    await authenticate(req);
    next();
});

app.get("/route", async (req, res) => {
    const result = await request("https://google.com");
    res.end(result);
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).end('error')

})

app.listen(5000)

// The problem is that when it rejects, it doesn't go to my error middleware, but if I remove the async keyword and throw inside a middleware it does.
app.use("/route", (req, res, next) => {
    throw new Error(err);
    res.end(result)
})

// The problem is that try/catch won't catch a Promise rejection outside of an async function and since express does not add a .catch handler to the Promise returned by your middleware, you get an UnhandledPromiseRejectionWarning.
// The easy way, is to add try/catch inside your middleware, and call next(err).

app.get('/route', async (req, res, next) => {
    try {
        const result = await request("https://google.com");
        res.end(result);
    } catch (error) {
        next(err)
    }
});

const asynchandler = (fun) => async (req, res, next) => {
    return Promise.resolve(fun(req, res, next)).catch(next);
};

module.exports = asynchandler;

//now you can call it like this

app.use(asyncHandler(async (req, res, next) => {
    await authenticate(req);
    next();
}));

// Step 1: Outer Function (asyncHandler)
function asyncHandler(fun) {

    // Step 2: Inner Function (Jo Express ko chahiye)
    return async function (req, res, next) {
        return Promise.resolve(fun(req, res, next)).catch(next);
    };

}
// Any rejection will go to the error handler



// Har jagah try-catch likhna padta hai (Boilerplate Code)
app.get('/async', async (req, res, next) => {
    try {
        const result = await request('http://example.com');
        res.end(result);
    } catch (error) {
        next(error); // Error ko Express ke error handler tak bhejna
    }
});

console.log('====================================');
// H.O.F FUNCTION
console.log('====================================');


// YEH MULTI FUNCTIONS KO ACPT KRTA OR THEN RETURN KRTA HA MAIN FUNCTION.
// Raw Data
const rawUserData = [
    {
        id: 1, name: "Ali", isActive: true, orders: [
            { amount: 50 },
            { amount: 100 }]
    },
    { id: 2, name: "Usman", isActive: false, orders: [{ amount: 200 }] },
    { id: 3, name: "Sara", isActive: true, orders: [{ amount: 300 }] }
];

// ya pipeline banata ha sab func data pr calyn gay then wo akheir data yahan show ho jay ga 

const createPipeline = (...transforms) => {
    return (data) => transforms.reduce((acc, transformFn) => transformFn(acc), data);
};
// get only active users
const filterActiveUser = (users) => users.filter(user => user.isActive);
// plus all amount
const calculateTotalSpent = (users) => users.map(user => ({
    ...user,
    totalSpend: user.orders.reduce((sum, order) => sum + order.amount, 0)
}));
// high to low
const sortByHighestSpender = (users) => [...users].sort((a, b) => b.totalSpend - a.totalSpend);


//Pipeline Compose karna
const ProcessUserAnalytics = createPipeline(
    filterActiveUser,
    calculateTotalSpent,
    sortByHighestSpender,
);
//show krna
const processData = ProcessUserAnalytics(rawUserData);
console.log("processData:", processData);

/* Output:
[
  { id: 3, name: 'Sara', isActive: true, orders: [...], totalSpent: 300 },
  { id: 1, name: 'Ali', isActive: true, orders: [...], totalSpent: 150 }
]
*/

// 2. Real-Time Projects me Use Hone Wali Real Examples
// A. API Request Debouncer (Search Input & Auto-Save ke liye)

function debounce(fn, delay) {
    let timerId;
    return function (...arg) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, arg)
        }, delay);
    };
};

// Real Project Usage:
const fetchSearchSuggestions = (query) => {
    console.log(`api call searchingfor :${query}`);
};

// Search handler ko debounce wrap kar diya (300ms delay ke sath)
const handleSearchInput = debounce((event) => {
    fetchSearchSuggestions(event.target.value);
}, 300)

// B.Express.js Route Middleware / Authentication Guard

const auteRule = (...reqRole) => {
    return (req, res, next) => {
        const { users } = req.users;

        if (!users) {
            return res.status(401).json({ message: "unauth" })
        };
        if (!reqRole.includes(users.role)) {
            return res.status(403).json({ message: Forbidden });
        }
        next();
    };
};

const acptRoles = auteRule(
    "ADMIN", "SUPER_ADMIN"
)

app.delete('/api/admin/delete-user', acptRoles);

// C. Curried Logger with Context (Microservices & Logging Utilities).


const createLoggers = (env) => (serviceName) => (level) => (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${env}] [${serviceName}] [${level.toUpperCase()}]: ${message}`);
}

const prodLog = createLoggers('PROD');
const authSerLog = prodLog("AuthService");
const logInfo = authSerLog('INFO')
const logError = authSerLog("error")

logInfo("user jwt verify")
// [2026-09-30T22:07:00.000Z] [PROD] [AuthService] [INFO]: User JWT token successfully verified
logError("timeout")
// [2026-09-30T22:07:00.000Z] [PROD] [AuthService] [ERROR]: Database connection timed out


// normal fn

function logMessage(env, ser, lvl, sms) {
    const timestamp = new Date().toDateString();
    console.log(`[${timestamp}] [${env}] [${ser}] [${lvl.toUpperCase()}]: ${sms}`);
}
// Har bar call karte waqt poora context repeat karna padega:

logMessage("PROD", "AuthService", "INFO", "user jwt verify");
logMessage("PROD", "AuthService", "ERROR", "timeout");
logMessage("PROD", "AuthService", "INFO", "password reset link sent");

// controllers/userController.js
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        // Har file me ye same 5 lines repeat karni padengi
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};
// 2. Universal Global Error Handler Setup (Best Practice ✅)


// utils/errorhandling.js

class ErrorHandler extends Error {
    constructor(message, StatusCode) {
        super(message);
        this.StatusCode = StatusCode;

        // Stack trace capture krna
        Error.captureStackTrace(this, this.constructor);
    }
}
module.express = ErrorHandler;

function asyncHandler(passedFunction) {
    return function (req, res, next) {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
}
module.exports = asyncHandler;

const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB / Mongoose ObjectId Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = `JSON Web Token is invalid. Try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Expired Error
    if (err.name === 'TokenExpiredError') {
        const message = `JSON Web Token is expired. Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // Development environment me stack trace dikhane ke liye:
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

const express = require('express');
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(express.json());

// Routes Mount karna
app.use('/api/v1/users', require('./routes/userRoutes'));

// Global Error Middleware (Hamesha saare routes ke baad aayega)
app.use(errorMiddleware);

module.exports = app;

// controllers/userController.js
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/ErrorHandler');

// Clean & Production-Ready Controller
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        // Direct Error Pass kar do, baki ka kaam Central Middleware karega
        return next(new ErrorHandler("User not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// this is the function which get value from another function from (params) args.
function First(params) {
    params()
    params()
    params()
    params()
};
// this function has values and it will pass to first function
function second() {
    console.log("one to");
}
// now we can call our first function and second function to it and first function get it's value and show it.
First(second);

// reguler function 
function name(params) {
    console.log('wfiuewfj');
}
name()


// Hof returning function 
function returnSomting(para) {
    return function () {
        return "!"
    }
}
// use it like it or
returnSomting()();
// this is inner function value 
let result = returnSomting("Raheed")
console.log(result);




