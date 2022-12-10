import template from './chat.tmpl';
import Block from "../../utils/Block";

interface Props {
    className: string,
    user: Record<string, string>,
    messages: Array<string>
}

export default class Chat extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className;
    }

    render() {
        return this.compile(template, this.props);
    }
}