import template from './chat.tmpl';
import Block from "../../utils/Block";
import {withStore} from "../../utils/Store";
import Message from "./Message";
import Input from "../input/input";
import Button from "../button/Button";
import MessagesController from "../../controllers/MessagesController";
import MembersList from "./members/MembersList";
import ChatController from "../../controllers/ChatController";

interface Props {
    className: string,
    user: Record<string, string>,
    messages?: Array<string>
}

class Chat extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className;
    }

    init() {
        this.children.input = new Input({
            name: 'message',
        })

        this.children.sendButton = new Button({
            events: {
                'click': () => {
                    const currentChat = store.getState().currentChat.id;
                    MessagesController.sendMessage(currentChat, this.children.input.element.value)
                    this.children.input.element.value = '';
                }
            }
        })

        this.children.members = new MembersList({})
        if (store.getState().currentChat) {
            const users = ChatController.getChatUsers(store.getState().currentChat.id);
            this.children.members.users = users;
        }

        this.children.membersButton = new Button({
            className: 'members-button ml-auto',
            events: {
                'click': () => this.children.members.show()
            }
        })
        super.init()
    }

    async getUserList() {
        const currentChat = store.getState().currentChat.id;
        if (!currentChat) return;
        const users = await ChatController.getChatUsers(store.getState().currentChat.id);
        this.children.members.setProps({ users: users.map(item => item) })
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(oldProps, newProps): boolean {
        if (newProps.currentChat) {
            this.element.querySelector('.chat-title').textContent = store.getState().currentChat?.title;
            this.getUserList();
        }
        if (store.getState().messages) {
            const messagesContainer = this.element.querySelector('.messages')
            const activeChat = store.getState().currentChat?.id
            messagesContainer.innerHTML = '';
            store.getState().messages[activeChat]?.map(item => new Message({
                message: item.content,
                incoming: item.user_id !== this.props.selfId
            })).forEach(element => messagesContainer.append(element.getContent()))
        }
        return false;
    }
}

const chatWithStore = withStore((state) => ({
    currentChat: state.currentChat || null,
    user: state.user
}))

export default chatWithStore(Chat);
