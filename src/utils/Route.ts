import Block from "./Block";

export interface BlockConstructable<P = any> {
    new(props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(selector: string, block: Block) {
    const root = document.querySelector(selector);
    if (!root) return;
    root.innerHTML = '';

    root.append(block.getContent()!);
    return root;
}

export default class Route {
    private _block: Block | null = null;

    constructor(
        private _pathname: string,
        private readonly _blockClass: Block,
        private readonly rootQuery: string) {
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
        }

        render(this.rootQuery, this._block);
        this._block.show();
    }
}
