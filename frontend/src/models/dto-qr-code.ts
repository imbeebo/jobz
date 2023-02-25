import User from "./dto-user";
import { Deserializable } from "./i-deserializer";

/**
 * Represents QR Code
 */
export default class DTOQRCode  {

    constructor(public name?: string,
        public data?: string,
        public user?: User) {
    }

    public static deserialize(data: DTOQRCode): DTOQRCode {
        const code = new DTOQRCode();
        const keys = Object.keys(code);
        for (const key of keys) {
            if (data.hasOwnProperty(key)) {
                if (key === 'user') {
                    code[key] = User.deserialize(data[key]);
                }
                code[key] = data[key];
            }
        }
        return code;
    }
}