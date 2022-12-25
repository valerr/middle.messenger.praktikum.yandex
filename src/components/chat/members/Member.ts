import Block from "../../../utils/Block";
import template from './member.tmpl';
import Button from "../../button/Button";
import ChatController from "../../../controllers/ChatController";

export interface Props {
    className?: string,
    name?: string,
    events?: Record<string, (arg: Event) => void>,
}

export default class Member extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className || '';
        this.children.delete = new Button({
            text: 'Remove',
            events: {
                'click': () => {
                    const currentChatId = store.getState().currentChat.id;
                    ChatController
                        .deleteUser(currentChatId, this.props.id)
                }
            }
        })
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
