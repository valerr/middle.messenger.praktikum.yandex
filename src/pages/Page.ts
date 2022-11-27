import Block from "../utils/Block";

type Props = Record <string, any>

export default class Page extends Block {
    constructor(props: Props) {
        super('main', props);
        this.element!.className = props.className;
    }

    render() {
        return this.compile(this.props.template, this.props);
    }
}