import HTTPTransport from "../utils/HTTPTransport";

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export interface Password {
    oldPassword: string,
    newPassword: string
}

export class UserAPI {
    protected http = new HTTPTransport();

    constructor() {
    }

    headers: Record<string, string> = { "Content-type": "application/json" }

    update(data: User): Promise<string | unknown> {
        return this.http.put('/user/profile', { data, headers: this.headers });
    }

    updatePassword(data: Password) {
        return this.http.put('/user/password', { data, headers: this.headers });
    }

    // updateAvatar(data) { // TODO ??
    //     return this.http.put('/user/profile/avatar');
    // }

}

export default new UserAPI();
