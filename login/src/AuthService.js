import User from "./login";


export default class AuthService {
    constructor() {
        this.USERS_KEY = 'registered_users';
        this.CURRENT_USER_KEY = 'current_user';
    }

    // Get all registered users from localStorage
    getAllUser() {
        const usersJSON = localStorage.getItem(this.USERS_KEY);
        if (!usersJSON) return [];

        const usersData = JSON.parse(usersJSON);
        return usersData.map(user => User.fromJson(user));
    };

    // Get all registered users from localStorage
    saveUsers(users) {
        const usersJSON = JSON.stringify(users.map(user => user.toJSON()));
        localStorage.setItem(this.USERS_KEY, usersJSON);
    };

    // Register a new user
    register(username, password) {
        if (!username || !password) {
            throw new Error("User and Password are required");
        };
        if (username < 3) {
            throw new Error("User name must be greater then 3 digit");
        };
        if (password < 6) {
            throw new Error("password name must be greater then 6 digit");
        };
        const users = this.getAllUser();

        // Check if user already exists
        const userExist = users.find(user => user.username === username);
        if (userExist) {
            throw new Error("user already exist");
        };

        // Create and save new user
        const NewUser = new User(username, password);
        users.push(NewUser);

        return NewUser;
    }
    // Login user
    login(username, password) {
        const users = this.getAllUser();

        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            throw new Error("Invalid username or password")
        }

        // Save current user to localStorage
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user.toJSON()));

        return user;
    };

    // Get current logged-in user
    getCurrentUser() {
        const userJSON = localStorage.getItem(this.CURRENT_USER_KEY);
        if (!userJSON) return null;

        return User.fromJson(JSON.parse(userJSON));
    };

    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    };

    // Check if user is logged in
    isLoggedIn() {
        return this.getAllUser() !== null;
    }
}