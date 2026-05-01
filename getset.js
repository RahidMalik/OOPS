// ============================================
// GETTERS & SETTERS - DETAILED EXPLANATION
// ============================================

// ============================================
// WHAT ARE GETTERS?
// ============================================

/*
GETTER = A method that LOOKS like a property

Instead of:  rect.area()     ← calling a function
You write:   rect.area       ← accessing a property

But behind the scenes, it's still running code!
*/

class Rectangle {
    constructor(width, height) {
        this.width = width;   // Regular property
        this.height = height; // Regular property
    }

    // GETTER - notice the 'get' keyword
    get area() {
        console.log("🔵 Calculating area...");
        return this.width * this.height;
    }

    // Another GETTER
    get perimeter() {
        console.log("🔵 Calculating perimeter...");
        return 2 * (this.width + this.height);
    }
}

console.log("=== GETTERS IN ACTION ===\n");

const rect = new Rectangle(10, 5);

// These look like accessing properties, but they're running functions!
console.log("Width:", rect.width);        // Direct property access
console.log("Height:", rect.height);      // Direct property access
console.log("Area:", rect.area);          // Getter - runs the get area() function
console.log("Perimeter:", rect.perimeter); // Getter - runs the get perimeter() function


// ============================================
// WHY USE GETTERS?
// ============================================

console.log("\n=== WHY GETTERS? ===\n");

// ❌ WITHOUT GETTER - you'd have to do this:
class RectangleOldWay {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // Regular method - need parentheses ()
    calculateArea() {
        return this.width * this.height;
    }
}

const rect1 = new RectangleOldWay(10, 5);
console.log("Old way (method):", rect1.calculateArea());  // Need ()

// ✅ WITH GETTER - cleaner syntax:
const rect2 = new Rectangle(10, 5);
console.log("New way (getter):", rect2.area);  // No () needed - looks like a property!


// ============================================
// WHAT ARE SETTERS?
// ============================================

/*
SETTER = A method that LOOKS like assigning to a property

Instead of:  rect.setDimensions(20, 10)  ← calling a function
You write:   rect.dimensions = {width: 20, height: 10}  ← looks like assignment

But behind the scenes, it's running code!
*/

class Rectangle2 {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    // SETTER - notice the 'set' keyword
    set dimensions(dim) {
        console.log("🟢 Setter called! Updating dimensions...");
        this.width = dim.width;
        this.height = dim.height;
    }
}

console.log("\n=== SETTERS IN ACTION ===\n");

const rect3 = new Rectangle2(10, 5);
console.log("Initial area:", rect3.area);

// Using the SETTER - looks like a simple assignment!
rect3.dimensions = { width: 20, height: 10 };

console.log("New area:", rect3.area);


// ============================================
// REAL-WORLD EXAMPLE: TEMPERATURE CONVERTER
// ============================================

console.log("\n=== REAL EXAMPLE: TEMPERATURE ===\n");

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    // GETTER - converts Celsius to Fahrenheit
    get fahrenheit() {
        return (this.celsius * 9 / 5) + 32;
    }

    // SETTER - accepts Fahrenheit and converts to Celsius
    set fahrenheit(f) {
        this.celsius = (f - 32) * 5 / 9;
    }

    display() {
        console.log(`${this.celsius}°C = ${this.fahrenheit}°F`);
    }
}

const temp = new Temperature(0);
temp.display();  // 0°C = 32°F

// Using SETTER to set temperature in Fahrenheit
temp.fahrenheit = 100;  // Looks like simple assignment!
temp.display();  // 37.77°C = 100°F


// ============================================
// GETTERS & SETTERS WITH VALIDATION
// ============================================

console.log("\n=== WITH VALIDATION ===\n");

class Person {
    constructor(name, age) {
        this._name = name;  // Note: _ prefix indicates "private by convention"
        this._age = age;
    }

    // GETTER for name
    get name() {
        return this._name.toUpperCase();  // Always returns uppercase
    }

    // SETTER for name (with validation)
    set name(newName) {
        if (newName.length < 2) {
            console.log("❌ Name too short!");
            return;
        }
        this._name = newName;
        console.log("✅ Name updated!");
    }

    // GETTER for age
    get age() {
        return this._age;
    }

    // SETTER for age (with validation)
    set age(newAge) {
        if (newAge < 0 || newAge > 150) {
            console.log("❌ Invalid age!");
            return;
        }
        this._age = newAge;
        console.log("✅ Age updated!");
    }
}

const person = new Person("john", 25);
console.log("Name:", person.name);  // JOHN (getter makes it uppercase)
console.log("Age:", person.age);    // 25

person.name = "J";  // Too short - validation fails
person.name = "Jane Doe";  // Valid - works!
console.log("Name:", person.name);  // JANE DOE

person.age = -5;  // Invalid - validation fails
person.age = 30;  // Valid - works!
console.log("Age:", person.age);  // 30


// ============================================
// COMPARISON: REGULAR METHOD vs GETTER/SETTER
// ============================================

console.log("\n=== COMPARISON ===\n");

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    // Regular method - needs ()
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }

    // Getter - no () needed
    get area() {
        return Math.PI * this.radius ** 2;
    }

    // Regular method to set radius
    setRadius(r) {
        this.radius = r;
    }

    // Setter - looks like assignment
    set diameter(d) {
        this.radius = d / 2;
    }
}

const circle = new Circle(5);

// Regular method way:
console.log("Area (method):", circle.calculateArea());  // Need ()
circle.setRadius(10);  // Need to call function

// Getter/Setter way:
console.log("Area (getter):", circle.area);  // No () - cleaner!
circle.diameter = 20;  // Looks like simple assignment - cleaner!


// ============================================
// KEY TAKEAWAYS
// ============================================

console.log("\n=== KEY POINTS ===\n");

console.log(`
📌 GETTER (get keyword):
   - Looks like a PROPERTY when you use it
   - But it's actually a FUNCTION running behind the scenes
   - Use when: you want to compute/calculate values on the fly
   - Syntax: rect.area (no parentheses!)

📌 SETTER (set keyword):
   - Looks like ASSIGNMENT when you use it
   - But it's actually a FUNCTION running behind the scenes
   - Use when: you want to validate or transform data before setting
   - Syntax: rect.dimensions = {width: 10, height: 5}

📌 BENEFITS:
   ✅ Cleaner, more readable code
   ✅ Can add validation/logic
   ✅ Can compute values dynamically
   ✅ Looks like regular property access
   ✅ Encapsulation - hide internal implementation

📌 WHEN TO USE:
   - Getters: For computed/calculated properties (area, fullName, age from birthdate)
   - Setters: For validation, formatting, or updating multiple properties at once
`);