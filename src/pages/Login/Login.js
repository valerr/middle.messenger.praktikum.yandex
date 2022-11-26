import Block from "../../utils/Block";
import template from '../login.tmpl';

export default class Login extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}