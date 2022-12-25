import API, { ChatAPI } from "../api/ChatAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";
import Router from "../utils/Router";

export interface Chat {
    id: number,
    title: string,
    avatar: string | null,
    created_by: number,
    unread_count: number,
    last_message: Record<string, string>,
}

class ChatController {
    private readonly api: ChatAPI;

    constructor() {
        this.api = API;
    }

    async getChats() {
        const chats = await this.api.read();

        if (typeof chats === "string") {
            try {
                JSON.parse(chats).map(async (chat: { id: number; }) => {
                    const token = await this.getToken(chat.id);

                    await MessagesController.connect(chat.id, token);
                });
                store.set('chats', JSON.parse(chats));
            } catch (e) {
                console.log(e)
                Router.go('/');
            }
        }
    }

    async getChatUsers(id: number) {
        const users = await this.api.getChatUsers(id);
        try {
            return JSON.parse(users as unknown as string);
        } catch (e) {
            console.log(e)
            Router.go('/');
        }
    }

    async getToken(id: number) {
        return this.api.getToken(id);
    }

    async addChat(name: string) {
        await this.api.addChat(name);
        await this.getChats();
    }

    async addUser(id: number, user: number) {
        await this.api.addUser(id, user);
    }

    async deleteUser(id: number, user: number) {
        await this.api.deleteUser(id, user);
    }

    async deleteChat(id: number) {
        await this.api.deleteChat(id);
    }

}

export default new ChatController();
