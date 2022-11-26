import EventBus from "./EventBus";
import HandleBars from 'handlebars';

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element = null;
    _meta = null;
    children = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", propsAndChildren = {}) {
        const { props, children } = this._getChildren(propsAndChildren);
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);
        this.children = this._makePropsProxy(children);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _getChildren(propsAndChildren) {
        return Object.entries(propsAndChildren).reduce((acc, [key, value]) => {
            if (value instanceof Block) {
                acc.children[key] = value;
            } else {
                acc.props[key] = value;
            }
            return acc;
        }, { children: {}, props: {} })
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount(oldProps) {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        this.element.append(block);
        this.addEvents();
    }

    render() {}

    addEvents() { // TODO remove
        const { events } = this.props;
        events && Object.entries(events).forEach(([eventName, event]) => {
            this._element.addEventListener(eventName, event);
        })
    }

    compile(template, props = {}) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="id-${child.id}"></div>`;
        });

        const fragment = document.createElement("template");
        fragment.innerHTML = HandleBars.compile(template)(propsAndStubs);
        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
            stub && stub.replaceWith(child.getContent());
        });
        return fragment.content;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "unset";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}