import Block from "../../utils/Block";
import template from './chat-item.tmpl';

export default class ChatItem extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }

}