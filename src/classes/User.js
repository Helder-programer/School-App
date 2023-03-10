export class User {
    #username;
    #password;

    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    getUsername() {
        return this.#username;
    }
    
    setUsername(newUsername) {
        this.#username = newUsername;
    }

    setPassword(newPassword) {
        this.#password = newPassword;
    }
}