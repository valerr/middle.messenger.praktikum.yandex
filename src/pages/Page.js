import Block from "../utils/Block";

export default class Page extends Block {
    constructor(props) {
        super('main', props);
        this.element.className = props.className;
    }

    render() {
        return this.compile(this.props.template, this.props);
    }
}