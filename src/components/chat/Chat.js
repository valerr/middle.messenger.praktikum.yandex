import template from './chat.tmpl';
import Block from "../../utils/Block";

export default class Chat extends Block {
    constructor(props) {
        super('div', props);
        this.element.className = props.className;
    }

    render() {
        return this.compile(template, this.props);
    }

}