import Block from "../../utils/Block";
import template from './avatar.tmpl';

export interface Props {
    className?: string,
    events?: Record<string, (arg: Event) => void>,
}

export default class Avatar extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
