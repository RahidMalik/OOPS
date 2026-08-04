## SECTION 4: OPERATORS (Actions perform karne ke tools)

### Arithmetic Operators:

let a = 10, b = 3;
a + b // 13 (addition)
a - b // 7 (subtraction)
a \* b // 30 (multiplication)
a / b // 3.33 (division)
a % b // 1 (remainder/modulo - 10 divide by 3 = 3 remainder 1)
a \*\* b // 1000 (exponentiation - 10^3)

// Increment/Decrement
a++ // 11 (post-increment - pehle use karo phir badhao)
++a // 11 (pre-increment - pehle badhao phir use karo)
a-- // 9 (post-decrement)
--a // 9 (pre-decrement)

// Difference:
let x = 5;
console.log(x++); // 5 (pehle print hua, phir 6 hua)
console.log(++x); // 7 (pehle 6 hua, phir print hua)

### Comparison Operators:

10 == "10" // true (loose equality - sirf value check, type convert)
10 === "10" // false (strict equality - value + type dono check)
10 != "10" // false
10 !== "10" // true (strict not equal)
10 > 5 // true
10 < 5 // false
10 >= 10 // true
10 <= 5 // false

IMPORTANT: Hamesha `===` use karo, `==` nahi (type conversion problems hota hai)

### Logical Operators:

true && true // true (AND - dono true hone chahiye)
true || false // true (OR - ek bhi true hai to true)
!true // false (NOT - opposite)
// Short-circuit evaluation
let name = "Rahid" || "Guest"; // "Rahid" (pehla truthy value)
let age = 0 || 18; // 18 (0 falsy hai)
let val = "" || "default"; // "default" (empty string falsy hai)

### Assignment Operators:

let x = 10;
x += 5; // x = x + 5 = 15
x -= 3; // x = x - 3 = 12
x _= 2; // x = x _ 2 = 24
x /= 4; // x = x / 4 = 6
x %= 4; // x = x % 4 = 2
x **= 2; // x = x ** 2 = 36

### Ternary Operator (Short if-else):

let age = 20;
let status = age >= 18 ? "Adult" : "Minor"; // "Adult"
// Full if-else equivalent:
if (age >= 18) {
status = "Adult";
} else {
status:"minor";
}

### Nullish Coalescing Operator:

let name = null ?? "Guest"; // "Guest" (null ya undefined ke liye)
let age = 0 ?? 18; // 0 (0 nullish nahi hai)
let val = "" ?? "default"; // "" (empty string nullish nahi hai)

### Optional Chaining:

let user = {
name: "Rahid",
address: {
city: "Lahore"
}
};
user.address?.city; // "Lahore" (exists)
user.address?.zip; // undefined (doesn't exist, error nahi)
user?.name; // "Rahid"
user?.address?.city; // "Lahore"
