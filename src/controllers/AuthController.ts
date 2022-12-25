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
        try {
            store.set('user', JSON.parse(user as unknown as string))
        } catch (e) {
            console.log(e);
        }

        return user;
    }

    async logout() {
        try {
            await this.api.logout();
        } catch (e) {
            console.error(e);
        }
    }
}

export default new AuthController();
