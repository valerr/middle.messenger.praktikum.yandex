import Page from "../Page";
import Button from "../../components/button/Button";
import template from './profile.tmpl';
import ChangeProfile from "../../components/profile/ChangeProfile";
import {validate, validateInputElement} from "../../utils/validate";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import { fields } from "../Register/Register";
import ButtonLink from "../../components/button/ButtonLink";
import AuthController from "../../controllers/AuthController";
import Router from "../../utils/Router";
import UserController from "../../controllers/UserController";
import {User} from "../../api/UserAPI";

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

export const changeProfile = new ChangeProfile({
    className: 'change-profile',
    form: new Form({
        fields,
        onSubmit: (event: Event) => {
            event.preventDefault();
            const data = new FormData(event.target as HTMLFormElement);
            console.log(Object.fromEntries(data));

            const inputs = document.querySelectorAll('input');
            const valid = [...inputs].every(elem => validate(elem.name, elem.value));
            return valid ? Object.fromEntries(data) : false;
        },
        controller: (data) => {
            UserController
                .update(data as User)
                .then(() => {
                    Router.go('/profile')
                })
                .catch(e => console.log(e))
        },
        inputs: Object.keys(fields).map(key => new Input({
            id: key,
            name: key,
            events : {
                'blur': ({ target }: Event) => {
                    validateInputElement(key, target as HTMLInputElement);
                },
                'focus': ({ target }: Event) => {
                    validateInputElement(key, target as HTMLInputElement);
                },
            }
        })),
        submitButton: new Button({
            text: 'Save',
            className: 'primary-button',
            type: 'submit',
        }),
    }),
    chatsButton: new ButtonLink({
        className: 'back-button',
        path: '/messenger'
    })
})

const Profile = new Page({
    template,
    chatsButton: new ButtonLink({
        className: 'back-button',
        path: '/messenger'
    }),
    logOutButton: new Button({
        text: 'Log out',
        events: {
            'click': () => {
                AuthController.logout().then(() => Router.go('/'))
            }
        }
    }),
    ChangeProfileButton: new ButtonLink({
        text: 'Edit profile',
        className: 'profile-editing',
        path: '/settings'
    }),
    info,
    name: 'Name',
})

export default Profile;
