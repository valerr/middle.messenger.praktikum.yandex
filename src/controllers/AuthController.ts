import API, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';

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
        return await this.api.read();
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
