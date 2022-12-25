import Block from "../../utils/Block";
import template from './message.tmpl';

export interface Props {
    className?: string,
    text?: string,
    events?: Record<string, (arg: Event) => void>,
}

export default class Message extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = 'message';
        if (props.incoming) this.element.classList.add('incoming');
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
