import Block from "../../utils/Block";
import template from './field.tmpl';

export interface Props {
    className?: string,
    name?: string,
    events?: Record<string, (arg: Event) => void>,
    value?: string
}

export default class Field extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className || '';
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
