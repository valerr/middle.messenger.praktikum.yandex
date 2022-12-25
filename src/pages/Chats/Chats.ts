import Page from "../Page";
import template from './chats.tmpl';
import ChatItem from "../../components/chat/ChatItem";
import Chat from "../../components/chat/Chat";
import ButtonLink from "../../components/button/ButtonLink";
import store, {withStore} from "../../utils/Store";
import ChatController from "../../controllers/ChatController";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/modal";
import Input from "../../components/input/input";

class Chats extends Page {
    constructor(props) {
        super({...props, template});
    }

    init() {
        this.children.ProfileButton = new ButtonLink({
          text: 'Profile',
          className: 'secondary-button profile-button text-muted',
          path: '/profile'
        })
        this.children.addChatButton = new Button({
            text: 'Add chat',
            className: 'add-chat-button',
            events: {
                'click': () => {
                    this.children.addChatModal.show();
                }
            }
        })
        this.children.addChatModal = new Modal({
            className: 'add-chat-modal',
            title: 'Add chat',
            input: new Input({}),
            submit: new Button({
                text: 'Add',
                className: 'primary-button mt-auto',
                events: {
                    'click': (event) => {
                        const title = event.target.previousElementSibling.value
                        title && ChatController
                            .addChat(title)
                            .then(() => {
                                this.children.addChatModal.hide();
                                this.chatsUpdated()
                            })
                            .catch(e => console.log(e))
                    }
                }
            })
        })


        const title = store.getState().currentChat?.title;
        this.children.chat = new Chat({
        className: 'chat-container',
        title,
        selfId: store.getState().user?.id,
    })

        ChatController
            .getChats()
            .then(() => this.chatsUpdated())
            .catch(e => console.log(e))
        super.init();
    }

    chatsUpdated() {
        const { chats } = store.getState();
        if (!chats) return;
        this.children.ChatItems = chats.map(item => new ChatItem({
            name: item.title,
            chat: item,
            message: item.last_message?.content || ' ',
            events: {
                'click': (event) => {
                    event.stopPropagation();
                    store.set('currentChat', {...item})
                }
            }
        }))
    }


}

const chatsWithStore = withStore((state) => ({
    user: state.user,
    chats: state.chats,
}))

export default chatsWithStore(Chats);
