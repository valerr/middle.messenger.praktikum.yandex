import Page from "../Page";
import Button from "../../components/button/Button";
import template from './profile.tmpl';

const Profile = new Page({
    template,
    chatsButton: new Button({
        className: 'back-button',
        events: {
            'click': () => location.href=`${location.origin}/chats`,
        }
    }),
    logOutButton: new Button({
        text: 'Log out',
        events: {
            'click': () => location.href=`${location.origin}/login`,
        }
    }),
    info: {
        first_name: {
            key: 'First name',
            value: 'Firstname'
        },
        second_name: {
            key: 'Last name',
            value: 'Lastname'
        },
        display_name: {
            key: 'Display name',
            value: 'Name'
        },
        login: {
            key: 'Login',
            value: '@login'
        },
        email: {
            key: 'Email',
            value: 'email@mail.mail'
        },
        phone: {
            key: 'Phone',
            value: '123456789'
        },
    },
    name: 'Name',
})

export default Profile;