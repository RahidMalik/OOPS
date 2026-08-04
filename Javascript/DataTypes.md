## SECTION 3: DATA TYPES (Kya kya store kar sakte ho)

### Primitive Types (Simple values - Memory mein directly store):

- String - Text
  let name = "Rahid";
  let city = 'Lahore';
  let bio = `My name is ${name} from ${city}`; // Template literal
- Number - Integers aur Decimals
  let age = 25;
  let price = 99.99;
  let negative = -5;
  let infinity = Infinity;
  let notANumber = NaN; // Not a Number
- Boolean - True ya False
  let isActive = true;
  let isLoggedIn = false;
- Undefined - Value assign nahi hui
  let x; // undefined
  console.log(x); // undefined
- Null - Intentional empty value
  let empty = null; // "Main yahan kuch nahi chahiye"
- Symbol - Unique identifier
  let id = Symbol("unique");
  let id2 = Symbol("unique");
  console.log(id === id2); // false (har Symbol unique hota hai)
- BigInt - Bade numbers
  let bigNumber = 9007199254740991n;

### Reference Types (Complex - Memory mein reference store):

- Object - Key-value pairs
  let user = {
  name: "Rahid",
  age: 25,
  isActive: true
  };
- Array - List of values
  let fruits = ["apple", "banana", "orange"];
- Function - Reusable code block
  function greet() {
  console.log("Hello");
  }

### Type Checking:

typeof "Rahid" // "string"
typeof 25 // "number"
typeof true // "boolean"
typeof undefined // "undefined"
typeof null // "object" (BUG in JS!)
typeof {} // "object"
typeof [] // "object"
typeof function(){} // "function"
typeof Symbol() // "symbol"
typeof 10n // "bigint"

### Memory Trick:

> "Primitive = Pure Raw Information Memorized In Tiny Individual Variables Easily"
> "Reference = Refer to Existing Format Everything Requires Extra Navigation Carefully"

### Important Concept: Pass by Value vs Pass by Reference

// Primitive (Pass by Value - copy)
let a = 10;
let b = a; // b mein a ki copy ban gayi
b = 20;
console.log(a); // 10 (original safe hai)
// Reference (Pass by Reference - same memory)
let obj1 = {name: "Rahid"};
let obj2 = obj1; // obj2 obj1 ke hi reference ko point kar raha hai
obj2.name = "Ali";
console.log(obj1.name); // "Ali" (same object change ho gaya)
