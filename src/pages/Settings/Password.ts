import Page from "../Page";
import template from "./password.tmpl";
import ButtonLink from "../../components/button/ButtonLink";
import Form from "../../components/form/form";
import {validate, validateInputElement} from "../../utils/validate";
import Router from "../../utils/Router";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";
import UserController from "../../controllers/UserController";

class Password extends Page {
    constructor(props) {
        super({...props, template});
    }

    init() {
        this.children.form = new Form({
            fields: { oldPassword: 'Old password', newPassword: 'New password' },
            onSubmit: (event: Event) => {
                event.preventDefault();
                const data = new FormData(event.target as HTMLFormElement);

                const inputs = document.querySelectorAll('input');
                const valid = [...inputs].every(elem => validate(elem.name, elem.value));
                return valid ? Object.fromEntries(data) : false;
            },
            controller: (data) => {
                UserController
                    .updatePassword(data)
                    .then(() => {
                        Router.go('/profile')
                    })
                    .catch(e => console.log(e))
            },
            inputs: Object.keys({ oldPassword: 'Old password', newPassword: 'New password' }).map(key => new Input({
                id: key,
                name: key,
                events : {
                    'blur': ({ target }: Event) => {
                        validateInputElement('password', target as HTMLInputElement);
                    },
                    'focus': ({ target }: Event) => {
                        validateInputElement('password', target as HTMLInputElement);
                    },
                }
            })),
            submitButton: new Button({
                text: 'Save',
                className: 'primary-button',
                type: 'submit',
            }),
        })
        this.children.chatsButton = new ButtonLink({
            className: 'back-button',
            path: '/messenger'
        })

        super.init()
    }
}

export default Password;
