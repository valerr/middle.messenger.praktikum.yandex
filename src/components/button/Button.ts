import Block from "../../utils/Block";
import template from './button.tmpl';
import Router from "../../utils/Router";

export interface Props {
    className?: string,
    type?: string,
    text?: string,
    events?: Record<string, (arg: Event) => void>,
}

export default class Button extends Block<Props> {
    router = Router
    constructor(props: Props) {
        super('button', props);
        this.element!.className = props.className || '';
        this.element!.setAttribute('type', this.props.type || 'button')

    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
