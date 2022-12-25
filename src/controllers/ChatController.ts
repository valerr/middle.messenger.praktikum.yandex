import API, { ChatAPI } from "../api/ChatAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatController {
    private readonly api: ChatAPI;

    constructor() {
        this.api = API;
    }

    async getChats() {
        const chats = await this.api.read();

        JSON.parse(chats).map(async (chat) => {
            const token = await this.getToken(chat.id);

            await MessagesController.connect(chat.id, token);
        });

        store.set('chats', JSON.parse(chats));
    }

    async getChatUsers(id: number) {
        const users = await this.api.getChatUsers(id);
        return JSON.parse(users);
    }

    async getToken(id: number) {
        return this.api.getToken(id);
    }

    async addChat(name: string) {
        await this.api.addChat(name);
        await this.getChats();
    }

    async deleteChat(id: number) {
        await this.api.deleteChat(id);
    }

    async addUser(id: number, user: number) {
        await this.api.addUser(id, user);
    }

    async deleteUser(id: number, user: number) {
        await this.api.deleteUser(id, user);
    }

}

export default new ChatController();
