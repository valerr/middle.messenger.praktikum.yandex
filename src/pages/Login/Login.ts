import Page from "../Page";
import Button from "../../components/button/Button";
import template from './login.tmpl';
import Form from "../../components/form/form";
import {validate, validateInputElement} from "../../utils/validate";
import Input from "../../components/input/input";

export const fields = {
    login: 'Login',
    password: 'Password'
}

const Login = new Page({
    template,
    registerButton: new Button({
        text: 'Create account',
        className: 'secondary-button',
        events: {
            'click': () => location.href=`${location.origin}/register`,
        }
    }),
    form: new Form({
        fields,
        events: {
            'submit': (event: Event) => {
                event.preventDefault();
                const data = new FormData(event.target as HTMLFormElement);
                console.log(Object.fromEntries(data));

                const inputs = document.querySelectorAll('input');
                const valid = [...inputs].every(elem => validate(elem.name, elem.value));
                if (valid) location.href=`${location.origin}/chats`
            },
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
            text: 'Sign in',
            className: 'primary-button',
            type: 'submit',
        }),
    }),
})

export default Login;