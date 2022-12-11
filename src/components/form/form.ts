import Block from "../../utils/Block";
import template from './form.tmpl';
import Input from "../input/input";
import Button from "../button/Button";
import {SigninData} from "../../api/AuthAPI";

interface Props {
    className?: string,
    events?: Record<string, (arg: Event) => void>,
    fields: Record<string, string>,
    inputs: Input[],
    submitButton: Button,
    onSubmit: (event: Event) => Record<string, string> | boolean,
    controller: (data: SigninData) => void
}

export default class Form extends Block<Props> {
    constructor(props: Props) {
        const events = {
            'submit': (event: Event) => {
                const data:SigninData = props.onSubmit(event)
                data && props.controller(data);
            }
        }
        super('form', {...props, events});
        this.element!.className = props.className || '';
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
