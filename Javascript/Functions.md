### Function Declaration:

function greet(name) {
return "Hello " + name;
}

console.log(greet("Rahid")); // Rahid
// Hoisted hota hai - pehle call kar sakte ho

console.log(chaiBanao()); // works! kyunke hoisted hai

function chaiBanao() {
return "Chai ready hai bhai ☕";
}

### High-order-function

function createApiClient(baseURL){
return async function(endPoint){
const res = fetch(`${baseURl}${endPoint}`)
return res.json();
}
};

// Configured Fetchers Variable mein store kar liye
const mainBackendApi = createApiClient("https://api.mywebsite.com/v1");
const paymentGateWayApi = createApiClient("https://api.stripe.com/v1");

// Ab sirf simple endpoint pass karein:
mainBackendApi("/users"); // Fetches: https://api.mywebsite.com/v1/users
mainBackendApi("/products"); // Fetches: https://api.mywebsite.com/v1/products
paymentGateWayApi("/charge"); // Fetches: https://api.stripe.com/v1/charge

#### 2. Function Expression

Kya hai: Function ko ek variable mein store karte ho. Ye hoisted nahi hota (sirf variable declaration hoisted hoti hai, value nahi).

js
const chaiBanao = function() {
return "Chai ban rahi hai...";
};

console.log(chaiBanao()); // sirf yahan se kaam karega
// console.log(chaiBanao()); // upar likho to error: Cannot access before initialization

Farq Declaration se: Ye value hai — matlab tum ise kisi aur function ko pass kar sakte ho (callback), array mein daal sakte ho, condition ke andar assign kar sakte ho:

let banane_ka_tarika;
if (mausam === "sardi") {
banane_ka_tarika = function() { return "Adrak wali chai"; };
} else {
banane_ka_tarika = function() { return "Thandi chai (iced tea)"; };
}

Ye Declaration se nahi ho sakta — declaration condition ke andar weird behave karti hai.

### 3. Arrow Function

Kya hai: Short syntax, aur sabse important: apna this nahi hota — bahar wale scope ka this use karta hai.

js
const chaiBanao = () => "Chai ready ☕";

Yahan asli maza this ka farq samajhne mein hai — ye example koi tutorial nahi deta:

function Dhaba(naam) {
this.naam = naam;
this.customers = 0;

// Normal function - 'this' bigad jayega
setInterval(function() {
this.customers++; // 'this' yahan window/undefined hai, Dhaba nahi!
console.log(this.customers); // NaN ya error
}, 1000);
}

vs Arrow function fix karta hai:

function Dhaba(naam) {
this.naam = naam;
this.customers = 0;

setInterval(() => {
this.customers++; // 'this' yahan Dhaba object hi hai (outer scope se liya)
console.log(`${this.naam}: ${this.customers} customers aaye`);
}, 1000);
}

new Dhaba("Chaudhary Chai Point");
Yaad rakhne wali baat: Arrow function this ko "inherit" karta hai jaise koi bachcha apne parent ka surname use karta hai — khud ka nahi banata.

### 4. IIFE (Immediately Invoked Function Expression)

Kya hai: Function jo define hote hi turant chal jata hai, dobara call nahi kar sakte.

js
const dhabaKaHisaab = (function() {
let cashInDrawer = 5000; // ye variable BAHAR se access nahi ho sakta - private hai!

return {
chaiBecho: function(price) {
cashInDrawer += price;
return `Bik gayi! Total cash: ${cashInDrawer}`;
}
};
})(); // <-- ye () IIFE ko turant chala deta hai

console.log(dhabaKaHisaab.chaiBecho(20)); // "Bik gayi! Total cash: 5020"
console.log(dhabaKaHisaab.cashInDrawer); // undefined - chupa hua hai!

Kyun use karte hain: Global scope ko pollute hone se bachata hai, aur private variables banata hai (jaise cashInDrawer bahar se koi chhed nahi sakta). Ye purane zamane mein modules banane ka tarika tha (ab import/export use hota hai, lekin ye pattern samajhna zaroori hai).

### Arrow Function (Modern):

// Normal form:
const greet = (name) => {
return "Hello " + name;
};
// Short form (implicit return):
const greet = (name) => "Hello " + name;
// Single parameter (parentheses optional):
const double = x => x \* 2;
// No parameter:
const sayHello = () => console.log("Hello");

### Default Parameters:

function greet(name = "Guest") {
return "Hello " + name;
}
console.log(greet()); // "Hello Guest"
console.log(greet("Rahid")); // "Hello Rahid"

### Rest Parameters (Multiple arguments):

function sum(...numbers) {
return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

### Callback Function (Function as argument):

function process(callback) {
console.log("Processing...");
callback();
}
process(() => console.log("Done!"));
// Output: "Processing..." "Done!"

### Higher Order Function:

"Jo function dusre function ko accept karta hai ya return karta hai."
// Map, Filter, Reduce - sab HOF hain
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x \* 2); // [2, 4, 6, 8, 10]
const filtered = numbers.filter(x => x > 3); // [4, 5]
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15

### IIFE (Immediately Invoked Function Expression):

(function() {
console.log("Immediately executed");
})();
// Turant execute ho jata hai, global scope pollution nahi karta

### Function Closures:

function outer() {
let count = 0; // Private variable

return function inner() {
count++;
return count;
};
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// 'count' variable destroy nahi hua, closure ne usko yaad rakha
