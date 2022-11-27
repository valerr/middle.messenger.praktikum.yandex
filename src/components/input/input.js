import Block from "../../utils/Block";
import template from './input.tmpl';

export default class Input extends Block {
    constructor(props) {
        super('input', props);
        this.element.id = props.id;
        this.element.name = props.name;
    }

    render() {
        return this.compile(template, this.props);
    }

}