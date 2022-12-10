import Block from "../../utils/Block";
import template from './change-profile.tmpl';
import Form from "../form/form";
import ButtonLink from "../button/ButtonLink";

interface Props {
    className?: string,
    events?: Record<string, (arg: Event) => void>,
    form: Form,
    chatsButton: ButtonLink
}

export default class ChangeProfile extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
        this.element!.className = props.className || '';
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
