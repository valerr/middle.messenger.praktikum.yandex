/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from "../../utils/Block";
import settingsTemplate from "./change-profile.tmpl";
import store from "../../utils/Store";
import {fields} from "../Register/Register";
import Form from "../../components/form/form";
import {validate, validateInputElement} from "../../utils/validate";
import UserController from "../../controllers/UserController";
import {User} from "../../api/UserAPI";
import Router from "../../utils/Router";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";
import ButtonLink from "../../components/button/ButtonLink";
import AuthController from "../../controllers/AuthController";

type Props = Record <string, any>
export default class Settings extends Block<Props> {
    constructor(props: Props) {
        super('main', {
            ...props,
            template: settingsTemplate,

        });

        const userData = store.getState().user;

        const { password, ...rest } = fields;
        this.children!.form = new Form({
            fields: rest,
            onSubmit: (event: Event) => {
                event.preventDefault();
                const data = new FormData(event.target as HTMLFormElement);

                const inputs = document.querySelectorAll('input');
                const valid = [...inputs].every(elem => validate(elem.name, elem.value));
                return valid ? Object.fromEntries(data) : false;
            },
            controller: (data) => {
                UserController
                    .update(data as unknown as User)
                    .then(() => {
                        AuthController
                            .fetchUser()
                            .then(() => Router.go('/profile'))
                    })
                    .catch(e => console.log(e))
            },
            inputs: Object.keys(rest).map(key => new Input({
                id: key,
                name: key,
                value: userData![key as keyof User] as string || '',
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
        })
        this.children!.chatsButton = new ButtonLink({
            className: 'back-button',
            path: '/messenger'
        })
        this.children!.changeAvatar = new Input({
            type: 'file',
            events: {
                'change': (event) => {
                    const data = (event.target as HTMLInputElement).files![0];
                    const formData = new FormData();
                    formData.set('avatar', data, data.name);

                    UserController
                        .updateAvatar(formData)
                        .then(() => {
                            location.reload();
                        })
                        .catch(e => console.log(e))

                }
            }
        })

        super.init()
    }

    render() {
        return this.compile(this.props.template, this.props);
    }
}
