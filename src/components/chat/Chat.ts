import template from './chat.tmpl';
import Block from "../../utils/Block";
import {withStore} from "../../utils/Store";
import Message from "./Message";
import Input from "../input/input";
import Button from "../button/Button";
import MessagesController, { Message as MessageType } from "../../controllers/MessagesController";
import MembersList from "./members/MembersList";
import ChatController from "../../controllers/ChatController";
import store from "../../utils/Store";

interface Props {
    className: string,
    user: Record<string, string>,
    messages?: Array<string>,
    selfId?: number
}

class Chat extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className;
    }

    init() {
        this.children!.input = new Input({
            name: 'message',
        })

        this.children!.sendButton = new Button({
            events: {
                'click': () => {
                    const currentChat = store.getState().currentChat.id;
                    const input = (this.children!.input.element as HTMLInputElement);
                    MessagesController.sendMessage(currentChat, input.value);
                    input.value = '';
                }
            }
        })

        this.children!.members = new MembersList({})
        if (store.getState().currentChat) {
            const users = ChatController.getChatUsers(store.getState().currentChat.id);
            this.children!.members.setProps({ users })
        }

        this.children!.membersButton = new Button({
            className: 'members-button ml-auto',
            events: {
                'click': () => this.children!.members.show()
            }
        })
        super.init()
    }

    async getUserList() {
        const currentChat = store.getState().currentChat.id;
        if (!currentChat) return;
        const users = await ChatController.getChatUsers(store.getState().currentChat.id);
        this.children!.members.setProps({ users: users.map((item: Record<string, string>) => item) })
    }

    render() {
        return this.compile(template, this.props);
    }

    componentDidUpdate(_oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        if (newProps.currentChat) {
            this.element.querySelector('.chat-title')!.textContent = store.getState().currentChat?.title;
            this.getUserList();
        }
        if (store.getState().messages) {
            const messagesContainer = this.element.querySelector('.messages')
            const activeChat = store.getState().currentChat?.id
            messagesContainer!.innerHTML = '';
            store.getState().messages[activeChat]?.map((item: MessageType) => new Message({
                message: item.content,
                incoming: item.user_id !== this.props.selfId
            })).forEach((element: Message) => (messagesContainer as HTMLElement).append(element.getContent()))
        }
        return false;
    }
}

const chatWithStore = withStore((state) => ({
    currentChat: state.currentChat || null,
    user: state.user
}))

// @ts-ignore
export default chatWithStore(Chat);
