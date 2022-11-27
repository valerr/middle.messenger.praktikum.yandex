import Page from "../Page";
import Button from "../../components/button/Button";
import template from './register.tmpl';
import Input from "../../components/input/input";
import {validate} from "../../utils/validate";

const data = {
    first_name: 'First name',
    second_name: 'Last name',
    login: 'Login',
    email: 'Email',
    phone: 'Phone',
    password: 'Password'
}

const errorMessages: Record<string, string> = {
    'first_name': 'Please enter a valid name',
    'second_name': 'Please enter a last name',
    'login':'Must contain 3-40 characters: no special characters',
    'email':'Please enter a valid email',
    'phone':'Invalid format',
    'password':'Must be 8-40 characters, contain at least 1 uppercase letter, 1 digit character',
};

const onFocusBlur = (key: string, target: HTMLInputElement) => {
    const check = validate(key, target.value);
    if (!check) {
        target.nextElementSibling!.classList.add('show')
        target.nextElementSibling!.textContent = errorMessages[key]
    } else {
        target.nextElementSibling!.classList.remove('show')
    }
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
        text: 'Create account',
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
                onFocusBlur(key, target as HTMLInputElement);
            },
            'focus': ({ target }: Event) => {
                onFocusBlur(key, target as HTMLInputElement);
            },
        }
    })),
    data,
    errorMessages
})

export default Register;