import Block from "../../utils/Block";
import template from './input.tmpl';

interface Props {
    name: string,
    className?: string,
    id: string,
    events: Record<string, (arg: Event) => void>
}

export default class Input extends Block<Props> {
    constructor(props: Props) {
        super('input', props);
        this.element!.id = props.id;
        (this.element as HTMLInputElement)!.name = props.name;
        this.element.value = props.value || '';
        this.element.type = props.type || '';
    }

    render() {
        return this.compile(template, this.props);
    }

}
