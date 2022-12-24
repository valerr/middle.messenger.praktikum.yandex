import API, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';
import store from "../utils/Store";

class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        await this.api.signin(data);
    }

    async signup(data: SignupData) {
        await this.api.signup(data);
    }

    async fetchUser() {
        const user = await this.api.read();
        store.set('user', JSON.parse(user))
        return user;
    }

    async logout() {
        try {
            await this.api.logout();
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthController();
