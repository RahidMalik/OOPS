// 1. UTILITY CLASS (Static Methods Only)
// We use this so we never have loose functions touching the DOM.
class DOMRenderer {
    static updateElement(elementId, content) {
        document.getElementById(elementId).innerHTML = content;
    }

    static appendToLog(message) {
        const log = document.getElementById('battle-log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = message;
        log.prepend(entry);
    }

    static bindEvent(elementId, eventType, callback) {
        document.getElementById(elementId).addEventListener(eventType, callback);
    }
}

// 2. BASE CLASS (Encapsulation & Abstraction)
class Character {
    // Private fields (cannot be accessed directly like hero.#name)
    #name;
    #hp;
    #maxHp;

    // Static property tracking total characters ever created
    static totalFighters = 0;

    constructor(name, hp) {
        if (this.constructor === Character) {
            throw new Error("Abstract classes cannot be instantiated.");
        }
        this.#name = name;
        this.#hp = hp;
        this.#maxHp = hp;
        Character.totalFighters++;
    }

    // Getters to safely read private data
    get name() { return this.#name; }
    get hp() { return this.#hp; }

    // Setter with validation
    set hp(value) {
        if (value < 0) this.#hp = 0;
        else if (value > this.#maxHp) this.#hp = this.#maxHp;
        else this.#hp = value;
    }

    // Method to be overridden (Polymorphism)
    attack(target) {
        throw new Error("Method 'attack()' must be implemented.");
    }
}

// 3. CHILD CLASS 1 (Inheritance)
class Warrior extends Character {
    #strength;

    constructor(name, hp, strength) {
        super(name, hp); // Calls the parent (Character) constructor
        this.#strength = strength;
    }

    // Polymorphism: Overriding the parent method
    attack(target) {
        const damage = Math.floor(Math.random() * this.#strength) + 5;
        target.hp -= damage;
        DOMRenderer.appendToLog(`${this.name} slashes ${target.name} for ${damage} damage!`);
    }
}

// 4. CHILD CLASS 2 (Inheritance)
class Mage extends Character {
    #magic;

    constructor(name, hp, magic) {
        super(name, hp);
        this.#magic = magic;
    }

    // Polymorphism: Different attack logic
    attack(target) {
        const damage = this.#magic * 2;
        target.hp -= damage;
        DOMRenderer.appendToLog(`${this.name} casts Fireball on ${target.name} for ${damage} damage!`);
    }
}

// 5. SYSTEM CONTROLLER CLASS
class GameController {
    #player1;
    #player2;

    constructor() {
        // Instantiating our objects
        this.#player1 = new Warrior("Arthur", 100, 15);
        this.#player2 = new Mage("Merlin", 80, 10);
    }

    init() {
        DOMRenderer.appendToLog(`System Booted. Total fighters registered: ${Character.totalFighters}`);
        this.#updateStats();

        // Arrow functions keep 'this' bound to the GameController instance
        DOMRenderer.bindEvent('attackBtn', 'click', () => this.#executeTurn());
    }

    // Private method: purely internal game logic
    #executeTurn() {
        if (this.#player1.hp === 0 || this.#player2.hp === 0) {
            DOMRenderer.appendToLog("The battle is already over!");
            return;
        }

        this.#player1.attack(this.#player2);

        if (this.#player2.hp > 0) {
            this.#player2.attack(this.#player1);
        } else {
            DOMRenderer.appendToLog(`${this.#player2.name} has fallen!`);
        }

        this.#updateStats();
    }

    #updateStats() {
        const statsHtml = `
            <strong>${this.#player1.name} (Warrior)</strong>: ${this.#player1.hp} HP <br>
            <strong>${this.#player2.name} (Mage)</strong>: ${this.#player2.hp} HP
        `;
        DOMRenderer.updateElement('stats', statsHtml);
    }
}

// The only code executed directly: Bootstrapping the application
const game = new GameController();
game.init();