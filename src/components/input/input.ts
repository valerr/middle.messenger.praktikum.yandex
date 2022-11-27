import Block from "../../utils/Block";
import template from './input.tmpl';

interface Props {
    name: string,
    className?: string,
    id: string,
    events: Record<string, Function>
}

export default class Input extends Block {
    constructor(props: Props) {
        super('input', props);
        this.element!.id = props.id;
        (this.element as HTMLInputElement)!.name = props.name;
    }

    render() {
        return this.compile(template, this.props);
    }

}