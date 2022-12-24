import Page from "../Page";
import template from './chats.tmpl';
import ChatItem from "../../components/chat/ChatItem";
import Chat from "../../components/chat/Chat";
import ButtonLink from "../../components/button/ButtonLink";
import store, {withStore} from "../../utils/Store";
import ChatController from "../../controllers/ChatController";

const chats = [
    {
        name: 'Name',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    },
    {
        name: 'Name2',
        message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    }
]

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
        this.children.ChatItems = chats.map(item => new ChatItem({
          name: item.name,
          message: item.message,
        }))
        const userName = store.getState().user.display_name || store.getState().user.first_name;
        this.children.chat = new Chat({
        className: 'chat-container',
        user: {
            name: userName,
        },
        messages: [
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui o',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
        ]
    })

        ChatController
            .getChats()
            .then(() => this.chatsUpdated())
            .catch(e => console.log(e))
        super.init();
    }

    chatsUpdated() {
        const { chats } = store.getState().chats;

    }


}

const chatsWithStore = withStore((state) => ({
    user: state.user
}))

export default chatsWithStore(Chats);
