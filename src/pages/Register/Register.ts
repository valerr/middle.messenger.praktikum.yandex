import Page from "../Page";
import Button from "../../components/button/Button";
import template from './register.tmpl';
import Input from "../../components/input/input";
import {validate, validateInputElement} from "../../utils/validate";
import Form from "../../components/form/form";

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

              const inputs = document.querySelectorAll('input');
              const valid = [...inputs].every(elem => validate(elem.name, elem.value));
              if (valid) location.href=`${location.origin}/login`
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
    signInButton: new Button({
        text: 'Sign in',
        className: 'secondary-button',
        events: {
            'click': () => location.href=`${location.origin}/login`,
        }
    }),
})

export default Register;