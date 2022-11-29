import Block from "../../utils/Block";
import template from './change-profile.tmpl';

interface Props {
    className?: string,
    events?: Record<string, (arg: Event) => void>,
    info: Record<string, unknown>,
    SaveButton: Block,
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