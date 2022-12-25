import Block from "../../utils/Block";
import template from './chat-item.tmpl';

interface Props {
    name: string,
    className?: string,
    message: string,
    events?: Record<string, () => void>,
    id: number
}

export default class ChatItem extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element.chat = props.chat;
    }

    render() {
        return this.compile(template, this.props);
    }

}
