## SECTION 2: VARIABLES (Data Store karne ka Tarika)

### Kya hai Variables?

"Variables containers hain jahan data store karate hain. Jaise fridge mein food store karte ho, variables mein values
store karte ho. Har variable ka name hota hai aur usme value hoti hai."

### Types of Variables:

#### 1. var (Purana tarika - AVOID karo)

var name = "Rahid";
name = "Ali"; // reassign ho sakta hai
console.log(name); // "Ali"

- Function scope ka hai (andar ke andar bhi accessible)
- Hoisting hota hai (upar utha ke rakh deta hai)
- Redeclare ho sakta hai
- Modern JS mein use nahi karna chahiye - bugs create karta ha

#### 2. let (Modern - Mutable)

let age = 25;
age = 26; // change ho sakta hai
console.log(age); // 26

- Block scope ka hai ({ } ke andar sirf accessible)
- Hoisting hota hai par TDZ (Temporal Dead Zone) mein error deta hai
- Redeclare nahi ho sakta
- Reassign ho sakta ha

#### 3. const (Modern - Immutable)

const PI = 3.14;
// PI = 3.15; // Error! Change nahi ho sakta
console.log(PI); // 3.14

- Block scope ka hai
- Hoisting nahi hota
- Redeclare nahi ho sakta
- Reassign nahi ho sakta
- Note: Object ke andar ke properties change ho sakti hain (const sirf reference ko protect karta hai)

### Variable Naming Rules:

// Correct
let userName = "Rahid";
let userAge = 25;
let \_private = "secret";
let $price = 100;
let camelCase = "test";
// Wrong
let 123name = "Rahid"; // number se start nahi kar sakte
let user-name = "Rahid"; // hyphen nahi use kar sakte
let let = 5; // keyword nahi use kar sakte
let User Name = "Rahid"; // space nahi le sakte

### Memory Tricks:

> "var = Very Always Reusable (purana, har jagah accessible, avoid karo)"
> "let = Let Execute Time pe change (modern, block level)"
> "const = Constant, Once Never Stop, Taxt Always Reuse"

### Practical Example:

// Global scope
var globalVar = "global";
let globalLet = "global";
const globalConst = "global";
function test() {
var functionVar = "function scope";
let functionLet = "block scope";
const functionConst = "block scope";

if (true) {
var blockVar = "function scope (var ignores block)";
let blockLet = "block scope";
const blockConst = "block scope";
}

console.log(blockVar); // Works! var function scope mein hai
// console.log(blockLet); // Error! block scope bahar
}
test();

