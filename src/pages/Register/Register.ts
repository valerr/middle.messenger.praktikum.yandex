import Page from "../Page";
import Button from "../../components/button/Button";
import template from './register.tmpl';
import Input from "../../components/input/input";
import {validate, validateInputElement} from "../../utils/validate";
import Form from "../../components/form/form";
import Router from "../../utils/Router";
import ButtonLink from "../../components/button/ButtonLink";

export const fields = {
    first_name: 'First name',
    second_name: 'Last name',
    login: 'Login',
    email: 'Email',
    phone: 'Phone',
    password: 'Password'
}

const Register = new Page({
    template,
    form: new Form({
        fields,
        events: {
          'submit': (event: Event) => {
              event.preventDefault();
              const data = new FormData(event.target as HTMLFormElement);
              console.log(Object.fromEntries(data));

              const inputs = document.querySelectorAll('.login-form input');
              const valid = [...inputs].every((elem: HTMLInputElement) => validate(elem.name, elem.value));
              if (valid) Router.go('/chats')
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
            text: 'Register',
            className: 'primary-button',
            type: 'submit',
        }),
    }),
    signInButton: new ButtonLink({
        text: 'Sign in',
        className: 'secondary-button',
        path: '/login'
    }),
})

export default Register;
