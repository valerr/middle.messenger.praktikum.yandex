import Block from "../../utils/Block";
import template from './input.tmpl';

interface Props {
    name?: string,
    className?: string,
    id?: string,
    events?: Record<string, (arg: Event) => void>,
    value?: string,
    type?: string,
    placeholder?: string
}

export default class Input extends Block<Props> {
    constructor(props: Props) {
        super('input', props);
        this.element!.id = props.id || '';
        (this.element as HTMLInputElement)!.name = props.name || '';
        (this.element as HTMLInputElement).value = props.value || '';
        (this.element as HTMLInputElement).type = props.type || '';
        (this.element as HTMLInputElement).className = props.className || '';
        (this.element as HTMLInputElement).placeholder = props.placeholder || '';
    }

    render() {
        return this.compile(template, this.props);
    }

}
