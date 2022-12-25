import Block from "../../utils/Block";
import template from './modal.tmpl';
import Button from "../button/Button";

export interface Props {
    className?: string,
    events?: Record<string, (arg: Event) => void>,
}

export default class Modal extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className || '';
        this.element.classList.add('modal');
        this.element.style.display = 'none'
        this.children.closeButton = new Button({
            text: 'Close',
            events: {
                'click': () => this.hide()
            }
        })
    }

    show() {
        this.element.style.display = 'flex';
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
