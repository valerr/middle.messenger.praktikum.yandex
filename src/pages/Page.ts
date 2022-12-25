import Block from "../utils/Block";

type Props = Record <string, any>

export default class Page extends Block<Props> {
    constructor(props: Props) {
        super('main', props);
    }

    render() {
        return this.compile(this.props.template, this.props);
    }
}
