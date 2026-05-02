export default class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    };
    // Method to convert user to JSON for storage
    toJSON() {
        return {
            username: this.username,
            password: this.password,
            createdAt: this.createdAt
        };
    };

    // Static method to create User from JSON
    static fromJson(json) {
        const user = new User(json.username, json.password);
        user.createdAt = json.createdAt;
    };
};