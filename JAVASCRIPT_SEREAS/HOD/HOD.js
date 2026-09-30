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

