import Block from "../../utils/Block";
import template from './button.tmpl';

interface Props {
    className?: string,
    type?: string,
    text?: string,
    events?: Record<string, Function>
}

export default class Button extends Block<Props> {
    constructor(props: Props) {
        super('button', props);
        this.element!.className = props.className || '';
        this.element!.setAttribute('type', this.props.type || 'button')
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}