import { Deserializable } from "./i-deserializer";

/**
 * Represents a user class
 */
export default class User {

    private password: string;

    /**
     * C.
     * @param username
     */
    constructor(private email?: string, private firstName?: string, private lastName?) {
    }

    public static deserialize(data: User): User {

        const user = new User();
        const keys = Object.keys(user);
        for (const key of keys) {
            if (data.hasOwnProperty(key)) {
                user[key] = data[key];
            }
        }
        return user;
    }


    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public setPassword(password: string) {
        this.password = password;
    }
}