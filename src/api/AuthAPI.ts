import HTTPTransport from "../utils/HTTPTransport";

export interface SigninData {
    login: string;
    password: string;
}

export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

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

export class AuthAPI {
    protected http = new HTTPTransport();

    constructor() {
    }

    headers: Record<string, string> = { "Content-type": "application/json" }

    signin(data: SigninData): Promise<string | unknown> {
        return this.http.post('/auth/signin', { data, headers: this.headers });
    }


    signup(data: SignupData) {
        return this.http.post('/auth/signup', { data, headers: this.headers });
    }

    read(): Promise<User> {
        return this.http.get('/auth/user');
    }

    logout() {
        return this.http.post('/auth/logout');
    }
}

export default new AuthAPI();
