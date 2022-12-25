/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from "../../../utils/Block";
import template from './members-list.tmpl';
import Member from "./Member";
import Button from "../../button/Button";
import Modal from "../../modal/modal";
import Input from "../../input/input";
import ChatController from "../../../controllers/ChatController";
import store from "../../../utils/Store";
import {User} from "../../../api/UserAPI";

export interface Props {
    className?: string,
    type?: string,
    text?: string,
    events?: Record<string, (arg: Event) => void>,
    users?: []
}

export default class MembersList extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className || 'members-list';
    }

    init() {
        this.children!.addUserModal = new Modal({
            title: 'Add user',
            className: 'add-user-modal',
            input: new Input({ name: 'userId', className: "mt-auto", placeholder: 'user id' }),
            submit: new Button({
                text: 'Add', // TODO search by login
                events: {
                    'click': (event) => {
                        const userId = ((event.currentTarget as HTMLElement)!.previousElementSibling as HTMLInputElement).value;
                        const currentChat = store.getState().currentChat.id;
                        ChatController
                            .addUser(currentChat, +userId)
                            .then(() => {
                                this.children!.addChatModal.hide()
                            })
                            .catch(e => console.log(e))
                    }
                }
            })
        })

        this.children!.addButton = new Button({
            text: '+',
            className: 'fw-bold d-flex ml-auto',
            events: {
                'click': () => {
                    this.children!.addUserModal.show();
                }
            }
        })


        super.init();
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
        if (this.props.users) {
            const usersContainer = this.element.querySelector('.users-list')
            usersContainer!.innerHTML = '';
            this.props.users
                .map((item: User) => new Member({ name: item.login, id: item.id }))
                .forEach(element => usersContainer!.append(element.getContent()))
        }
        return false;
    }

}
