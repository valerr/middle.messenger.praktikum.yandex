import EventBus from "./EventBus";
// @ts-ignore
import HandleBars from 'handlebars';
import { v4 as uuid } from "uuid";
import {isEqual} from "./helpers";

type Props = Record <string, any>
type Children = Record <string, Block>

export default abstract class Block<P extends Props = any> {
    static readonly EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;
    protected props: P;
    private _element: HTMLElement;
    private _meta: { tagName: string; props: P };
    children: Children | null;
    public id;
    private eventBus: () => EventBus;

    constructor(tagName = "div", propsAndChildren: P) {
        const { props, children } = this._getChildren(propsAndChildren);
        const eventBus = new EventBus();

        this._meta = { tagName, props: props as P };

        this.id = uuid();

        this.props = this._makePropsProxy(props);
        this.children = this._makePropsProxy(children);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);

    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _getChildren(propsAndChildren: P) {
        return Object.entries(propsAndChildren).reduce<Record<string, any>>((acc, [key, value]) => {
            if (value instanceof Block ||
                (Array.isArray(value) &&
                    value.every((item) => item instanceof Block))) {
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

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: P, newProps: P) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(_oldProps: P, _newProps: P) {
        return !isEqual(_oldProps, _newProps)
    }

    setProps = (nextProps: P) => {
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

        if (this._element) {
            this._element.innerHTML = '';
            this.removeEvents();
        }
        this.element?.append(block);
        this.addEvents();
    }

    render():DocumentFragment {
        return new DocumentFragment();
    }

    addEvents() {
        this.props.events && Object.keys(this.props.events).forEach((eventName) => {
            this._element?.addEventListener(eventName, this.props.events[eventName]);
        })
    }

    removeEvents() {
        this.props.events && Object.keys(this.props.events).forEach(eventName => {
            this._element.removeEventListener(eventName, this.props.events[eventName]);
        })
    }

    compile(template: string, props = {}) {
        const propsAndStubs = { ...props } as Props;

        Object.entries(this.children as Children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map(item => `<div data-id="${item.id}"></div>`)
                return
            }
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        const fragment = document.createElement("template");
        fragment.innerHTML = HandleBars.compile(template)(propsAndStubs);
        Object.values(this.children as Children).flat().forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            stub && stub.replaceWith(child.getContent()!);
        });
        return fragment.content;
    }

    getContent(): HTMLElement {
        return this.element;
    }

    _makePropsProxy(props: any) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldValue = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = "unset";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}
