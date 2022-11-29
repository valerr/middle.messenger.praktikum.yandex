import Page from "../Page";
import Button from "../../components/button/Button";
import template from './register.tmpl';
import Input from "../../components/input/input";
import {validate, validateInputElement} from "../../utils/validate";

const data = {
    first_name: 'First name',
    second_name: 'Last name',
    login: 'Login',
    email: 'Email',
    phone: 'Phone',
    password: 'Password'
}

const Register = new Page({
    template,
    registerButton: new Button({
        text: 'Register',
        className: 'primary-button',
        events: {
            'click': (event: Event) => {
                event.preventDefault();
                const inputs = document.querySelectorAll('input');
                const valid = [...inputs].every(elem => validate(elem.name, elem.value))
                // @ts-ignore
                console.log(Object.fromEntries(new FormData(event.target!.form)))
                if (valid) location.href=`${location.origin}/login`
            }
        }

    }),
    signInButton: new Button({
        text: 'Sign in',
        className: 'secondary-button',
        events: {
            'click': () => location.href=`${location.origin}/login`,
        }
    }),
    inputs: Object.keys(data).map(key => new Input({
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
    data,
})

export default Register;