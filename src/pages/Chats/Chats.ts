import Page from "../Page";
import template from './chats.tmpl';
import ChatItem from "../../components/chat/ChatItem";
import Chat from "../../components/chat/Chat";
import ButtonLink from "../../components/button/ButtonLink";

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


const Chats = new Page({
    template,
    ProfileButton: new ButtonLink({
        text: 'Profile',
        className: 'secondary-button profile-button text-muted',
        path: '/profile'
    }),
    ChatItems: chats.map(item => new ChatItem({
        name: item.name,
        message: item.message,
    })),
    chat: new Chat({
        className: 'chat-container',
        user: {
            name: 'UserName',
        },
        messages: [
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui o',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
        ]
    })
})

export default Chats;
