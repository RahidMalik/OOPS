// let a, b, c;
// a = 1,
//     b = 2,
//     c = 3

let [a, b, c] = [1, 2, 4]; // that is clean way.

// give accurate name to understand.
let daysCartActive = 5;
let CurrentYear = new Date().getFullYear();
const isShippingFree = cart.total > 50;

// easyway to consider what is inside of var
const book = [
    id,
    title,
    Price
];

book.Price

// const street = address.street;
// const city = address.street;
// const state = address.street;
// const zipcode = address.street;

const { street, city, state, zipcode } = address;

// Messy: Zyada nesting, logic samajhna mushkil hai
function processUserOrder(user, order) {
    if (user) {
        if (user.isActive) {
            if (order && order.items.length > 0) {
                return executePayment(user, order);
            } else {
                throw new Error("Empty order");
            }
        } else {
            throw new Error("Inactive user");
        }
    } else {
        throw new Error("User required");
    }
}

// Clean: Guard clauses se code bilkul flat ho gaya
function processUserOrder(user, order) {
    if (!user) throw new Error("User required");
    if (!user.isActive) throw new Error("Inactive user");
    if (!order?.items?.length) throw new Error("Empty order");

    return executePayment(user, order);
}
// Imperative: Extra variable tracking, parhna mushkil
const activeUserEmailss = [];
for (let i = 0; i < users.length; i++) {
    if (users[i].status === 'active' && users[i].email) {
        activeUserEmails.push(users[i].email.toLowerCase());
    }
}

// Declarative: Intent ek glance mein samajh aata hai
const activeUserEmails = users
    .filter(user => user.status === 'active' && user.email)
    .map(user => user.email.toLowerCase());

//     Daily Drills(15–20 Minutes)
// Native JS Methods Scratch Se Banao: Bina documentation ya AI ke yeh methods custom implement karo:

// Array Methods: Array.prototype.myMap, myFilter, myReduce, myFlat

// Async Utilities: Promise.all, custom async / await wrapper

// Control Utilities: debounce(fn, delay), throttle(fn, delay), EventEmitter class

//     Paper Execution Tracing: Async JS snippet(Promise, setTimeout, async / await) ko notebook par trace karo aur output order likho.Phir Terminal par run karke check karo.