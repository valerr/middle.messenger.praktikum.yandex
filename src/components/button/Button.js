import Block from "../../utils/Block";
import template from './button.tmpl';

export default class Button extends Block {
    constructor(props) {
        super('button', props);
        this.element.className = props.className;
        this.element.setAttribute('type', this.props.type || 'button')
    }

    render() {
        return this.compile(template, this.props);
    }

}