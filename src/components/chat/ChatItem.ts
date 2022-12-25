import Block from "../../utils/Block";
import template from './chat-item.tmpl';
import Button from "../button/Button";

interface Props {
    name: string,
    className?: string,
    message: string,
    events?: Record<string, (event: Event) => void>,
    id: number,
    removeChat: (id: number) => void
}

export default class ChatItem extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.children!.remove = new Button({
            text: 'delete',
            className: 'remove-chat text-muted',
            events: {
                'click': (event: Event) => {
                    event.stopPropagation();
                    this.props.removeChat(this.props.id);
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }

}
