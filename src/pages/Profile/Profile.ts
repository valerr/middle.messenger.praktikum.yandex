import Page from "../Page";
import Button from "../../components/button/Button";
import template from './profile.tmpl';
import renderBlock from "../../utils/renderBlock";
import ChangeProfile from "../../components/profile/ChangeProfile";
import {validateInputElement} from "../../utils/validate";


const info = {
    first_name: {
        key: 'First name',
        name: 'first_name',
        value: 'Firstname'
    },
    second_name: {
        key: 'Last name',
        name: 'second_name',
            value: 'Lastname'
    },
    display_name: {
        key: 'Display name',
        name: 'display_name',
            value: 'Name'
    },
    login: {
        key: 'Login',
        name: 'login',
            value: '@login'
    },
    email: {
        key: 'Email',
        name: 'email',
            value: 'email@mail.mail'
    },
    phone: {
        key: 'Phone',
        name: 'phone',
            value: '123456789'
    },
}

const changeProfile = new ChangeProfile({
    events: {
      'input': (event: Event) => validateInputElement((event.target as HTMLInputElement)!.name, event.target as HTMLInputElement),
    },
    info: {
        ...info,
        password: {
            key: 'Password',
            name: 'password',
        },
    },
    SaveButton: new Button({
        text: 'Save',
    })
})

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
    ChangeProfileButton: new Button({
        text: 'Edit profile',
        events: {
            'click': () => {
                renderBlock(changeProfile, '.profile-editable');
            },
        }
    }),
    info,
    name: 'Name',
})

export default Profile;