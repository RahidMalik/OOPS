// ============================================
// CLASSES & CONSTRUCTORS IN JAVASCRIPT
// ============================================

// ============================================
// 1. BASIC CLASS SYNTAX
// ============================================

// a class is a blueprint for creating object.

class Person {
    // constructor is a special method when you write a new object 
    constructor(name, age) {
        // 'this' refers to the current instance being created
        this.name = name;
        this.age = age;
    }
    // Method (function inside a class)
    introduce() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }
}

// Creating instances (objects) from the class
const Person1 = new Person("Rahid", 20);
const Person2 = new Person("Sammer", 21);

console.log("=== Basic Class Example ===");
Person1.introduce(); // Hi, I'm Rahid and I'm 20 years old.
Person2.introduce();// Hi, I'm sammer and I'm 21 years old.


// ============================================
// 2. CONSTRUCTOR WITH DEFAULT VALUES
// ============================================

class Car {
    constructor(brand, model, year = 2020, color = "Black") {
        this.brand = brand
        this.model = model;
        this.year = year;
        this.color = color;
    }

    getDetail() {
        return `${this.year} ${this.color} ${this.brand} ${this.model}`;
    }
};

console.log("\n=== Constructor with Defaults ===");
const car1 = new Car("Toyota", "Camry") // Uses default year and color
const car2 = new Car("Honda", "Civic", 2023, "Red");

console.log(car1.getDetail());  // 2024 Black Toyota Camry
console.log(car2.getDetail());  // 2023 Red Honda Civic



// ============================================
// 3. CONSTRUCTOR WITH VALIDATIONc
// ============================================


class BankAccount {
    constructor(accountNumber, HolderNumber, initialBalance = 0) {
        // Validation inside constructor
        if (initialBalance = 0) {
            throw new Error("Initial balance cannot be negative!");
        }

        this.accountNumber = accountNumber;
        this.HolderNumber = HolderNumber;
        this.balance = initialBalance;
    };

    getBalance() {
        return (`Total Account Balance in this Account${this.accountNumber} ${this.balance} `)
    }
};


console.log("\n=== Constructor with Validation ===");
const account1 = new BankAccount("ACC001", "John Doe", 1000);
console.log(account1.getBalance());  // Account ACC001: $1000

// This will throw an error:
try {
    const invalidAccount = new BankAccount("ACC002", "Jane", -500);
} catch (error) {
    console.log("Error: Initial balance cannot be negative!", error.message);  // Error: Initial balance cannot be negative!
}


// ============================================
// 4. MULTIPLE PROPERTIES & METHODS
// ============================================

class Student {
    constructor(name, rollNumber, grade) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grade = grade;
        this.subjects = [];  // Initialize empty array
        this.attendance = 0;
    }

    // Method to add subjects
    addSubject(subject) {
        this.subjects.push(subject)
    }

    // Method to mark attendance
    markPresent() {
        this.attendance++
    }

    // Method to display student info
    displayInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Roll No: ${this.rollNumber}`);
        console.log(`Grade: ${this.grade}`);
        console.log(`Subjects: ${this.subjects.join(", ")}`);
        console.log(`Attendance: ${this.attendance} days`);
    }
};

console.log("\n=== Student Class Example ===");
const student1 = new Student("Emma", "S001", "A");
student1.addSubject("Math")
student1.addSubject("Science")
student1.addSubject("English")
student1.markPresent();
student1.markPresent();
student1.markPresent();
student1.markPresent();
student1.markPresent();
student1.displayInfo();


// ============================================
// 5. COMPLEX OBJECT IN CONSTRUCTOR
// ============================================

class Product {
    constructor(productData) {
        // Accepting an object as parameter

        this.id = productData.id;
        this.name = productData.name;
        this.price = productData.price;
        this.category = productData.category || "General";
        this.InStock = productData.InStock !== undefined ? productData.InStock : true;
    };


    getinfo() {
        const stockStatus = this.inStock ? "In Stock" : "Out of Stock";
        return `${this.name} ($${this.price}) - ${stockStatus}`;
    };
};
console.log("\n=== Object Parameter in Constructor ===");
const product = new Product({
    id: 101,
    name: "Laptop",
    price: 999,
    category: "Electronics",
    inStock: true
});
const product2 = new Product({
    id: 102,
    name: "Mouse",
    price: 25
});

console.log(product.getinfo());
console.log(product2.getinfo());

// ============================================
// 6. STATIC vs INSTANCE
// ============================================


class Counter {
    // Static property - shared across all instances
    static totalObjects = 0;

    constructor(name) {
        this.name = name; // Instance property - unique to each object
        Counter.totalObjects++  // Increment static counter
    }

    // Static method - called on class itself, not instances
    static getTotalCount() {
        return `Total Counter objects created: ${Counter.totalObjects}`;
    }

    // Instance method - called on individual objects
    display() {
        console.log(`Counter: ${this.name}`);
    }
}

console.log("\n=== Static vs Instance ===");
const counter1 = new Counter("First");
const counter2 = new Counter("Second");
const counter3 = new Counter("3rd");

counter1.display(); // Instance method
counter2.display(); // Instance method
counter3.display(); // Instance method
console.log(Counter.getTotalCount()); // Static method - called on class

// ============================================
// 7. GETTER & SETTER IN CONSTRUCTOR
// ============================================

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    };

    // Getter - access like a property, not a method
    get area() {
        return this.width * this.height;
    };

    // Getter for perimeter
    get perimeter() {
        return 2 * (this.width + this.height);
    };

    // Setter - allows setting derived values
    set dimensions(dim) {
        this.width = dim.width;
        this.height = dim.height;
    };
};

console.log("\n=== Getters & Setters ===");
const rect = new Rectangle(10, 5);
console.log(`Area: ${rect.area}`);  // Notice: we use it like a property, not rect.area()
console.log(`Perimeter: ${rect.perimeter}`);

rect.dimensions = { width: 20, height: 10 }
console.log(`New Area: ${rect.area}`);

// ============================================
// 8. PRIVATE FIELDS (Modern JavaScript)
// ============================================

class User {
    // Private field - starts with #
    #password;

    constructor(username, password) {
        this.username = username;  // Public
        this.#password = password;  // Private - can't be accessed outside class
    }
    // Public method to verify password
    verifyPassword(inputPassword) {
        return this.#password === inputPassword;
    }
    // Can't directly access #password from outside
    changePassword(oldPassword, newPassword) {
        if (this.#password === oldPassword) {
            this.#password = newPassword;
            return "Password changed successfully!";
        }
        return "Incorrect old password!";
    };
};

console.log("\n=== Private Fields ===");
const user = new User("john_doe", "secret123");
console.log(`Username: ${user.username}`);

//! console.log(user.#password);  // This would cause an error!

console.log(`Password check: ${user.verifyPassword("secret123")}`);
console.log(user.changePassword("secret123", "newSecret456"));

// ============================================
// QUICK REFERENCE
// ============================================

/*
KEY POINTS:
 
1. CLASS: Blueprint for creating objects
   class ClassName { }
 
2. CONSTRUCTOR: Special method that initializes objects
   constructor(param1, param2) { }
 
3. THIS: Refers to the current instance
   this.property = value;
 
4. NEW: Keyword to create instances
   const obj = new ClassName();
 
5. METHODS: Functions inside a class
   methodName() { }
 
6. STATIC: Belongs to class, not instances
   static methodName() { }
 
7. GETTERS/SETTERS: AccFess properties with logic
   get propertyName() { }
   set propertyName(value) { }
 
8. PRIVATE FIELDS: Can't be accessed outside class
   #privateField;
*/