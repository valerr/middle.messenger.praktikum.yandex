import API, {Password, User, UserAPI} from "../api/UserAPI";

class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async update(data: User) {
        await this.api.update(data);
    }

    async updatePassword(data: Password) {
        await this.api.updatePassword(data);
    }

    async updateAvatar(avatar: FormData) {
        return await this.api.updateAvatar(avatar);
    }

}

export default new UserController();
