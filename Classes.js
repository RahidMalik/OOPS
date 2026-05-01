// This is How Create Objects – Classes


// So any video game needs characters, right ? And all characters have certain characteristics(properties) like color, height, name, and so on and abilities(methods) like jumping, running, punching, and so on.Objects are the perfect data structure to use to store this kind of information.


class car {
    constructor(brand, model) {
        this.brand = brand;// property
        this.model = model;// property
    }

    // method
    showDetails() {
        console.log(`this car is${this.brand} and ${this.model}.`);
    }
}
// Creating objects from the class
const car1 = new car("Toyota", "Corolla");
const car2 = new car("Honda", "Civic");

// Using the objects
car1.showDetails(); // This car is a Toyota Corolla.
car2.showDetails(); // This car is a Honda Civic.


const alien1 = {
    name: "Ali",
    species: "alien",
    phrase: () => console.log("I'm Ali the alien!"),
    fly: () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}
const alien2 = {
    name: "Lien",
    species: "alien",
    sayPhrase: () => console.log("Run for your lives!"),
    fly: () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}
const bug1 = {
    name: "Buggy",
    species: "bug",
    sayPhrase: () => console.log("Your debugger doesn't work with me!"),
    hide: () => console.log("You can't catch me now!")
}
const bug2 = {
    name: "Erik",
    species: "bug",
    sayPhrase: () => console.log("I drink decaf!"),
    hide: () => console.log("You can't catch me now!")
}
const Robot1 = {
    name: "Tito",
    species: "robot",
    sayPhrase: () => console.log("I can cook, swim and dance!"),
    transform: () => console.log("Optimus prime!")
}
const Robot2 = {
    name: "Terminator",
    species: "robot",
    sayPhrase: () => console.log("Hasta la vista, baby!"),
    transform: () => console.log("Optimus prime!")
}

console.log(alien1.name) // output: "Ali"
console.log(bug2.species) // output: "bug"
Robot1.sayPhrase()// output: "I can cook, swim and dance!"
Robot2.transform()// output Optimus prime!

