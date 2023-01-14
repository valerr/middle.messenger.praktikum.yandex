import HTTPTransport from "../utils/HTTPTransport";
import Router from "../utils/Router";

export class ChatAPI {
    protected http = new HTTPTransport();

    constructor() {
    }

    headers: Record<string, string> = { "Content-type": "application/json" }

    read(): Promise<string | unknown> {
        return this.http.get('/chats', { headers: this.headers });
    }

    addChat(title: string): Promise<string | unknown> {
        return this.http.post('/chats', { data: { title }, headers: this.headers })
    }

    getChatUsers(id: number) {
        return this.http.get(`/chats/${id}/users`, { headers: this.headers })
    }

    addUser(id: number, user: number): Promise<string | unknown> {
        return this.http.put('/chats/users', { data: { users: [user], chatId: id }, headers: this.headers })
    }

    deleteUser(id: number, user: number) {
        return this.http.delete('/chats/users', { data: { users: [user], chatId: id }, headers: this.headers })
    }

    deleteChat(id: number) {
        return this.http.delete('/chats/', { data: { chatId: id }, headers: this.headers })
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post(`/chats/token/${id}`, { mode: 'cors', credentials: "include" });

        let token;
        try {
            token = JSON.parse(response as unknown as string).token;
        } catch (e) {
            console.log(e)
            Router.go('/');
        }

        return token;
    }
}

export default new ChatAPI();
