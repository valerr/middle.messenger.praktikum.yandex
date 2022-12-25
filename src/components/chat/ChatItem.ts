import Block from "../../utils/Block";
import template from './chat-item.tmpl';

interface Props {
    name: string,
    className?: string,
    message: string,
    events?: Record<string, (event: Event) => void>,
    id?: number
}

export default class ChatItem extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }

}
