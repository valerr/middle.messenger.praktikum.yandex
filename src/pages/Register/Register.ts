import Page from "../Page";
import Button from "../../components/button/Button";
import template from './register.tmpl';
import Input from "../../components/input/input";
import {validate, validateInputElement} from "../../utils/validate";
import Form from "../../components/form/form";
import Router from "../../utils/Router";
import ButtonLink from "../../components/button/ButtonLink";
import AuthController from "../../controllers/AuthController";
import {SignupData} from "../../api/AuthAPI";

export const fields = {
    first_name: 'First name',
    second_name: 'Last name',
    login: 'Login',
    email: 'Email',
    phone: 'Phone',
    password: 'Password'
}

type Props = Record <string, any>
class Register extends Page {
    constructor(props: Props) {
        super({...props, template});
    }

    init() {
        this.children!.form = new Form({
            fields,
            onSubmit: (event: Event) => {
                event.preventDefault();
                const data = new FormData(event.target as HTMLFormElement);

                const inputs = document.querySelectorAll('#register input');
                const valid = [...inputs].every((elem: HTMLInputElement) => validate(elem.name, elem.value));
                return valid ? Object.fromEntries(data) : false;
            },
            controller: (data) => {
                AuthController
                    .signup(data as unknown as SignupData)
                    .then(() => {
                        Router.go('/messenger')
                    })
                    .catch((e: Error) => {
                        console.log(e)
                    })
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
        })

        this.children!.signInButton = new ButtonLink({
            text: 'Sign in',
            className: 'secondary-button',
            path: '/login'
        })

        super.init();
    }

}

export default Register;
