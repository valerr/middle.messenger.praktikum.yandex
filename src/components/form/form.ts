import Block from "../../utils/Block";
import template from './form.tmpl';
import Input from "../input/input";
import Button from "../button/Button";

interface Props {
    className?: string,
    events?: Record<string, (arg: Event) => void>,
    fields: Record<string, string>,
    inputs: Input[],
    submitButton: Button,
}

export default class Form extends Block<Props> {
    constructor(props: Props) {
        super('form', props);
        this.element!.className = props.className || '';
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
