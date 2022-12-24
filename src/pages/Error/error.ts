import Page from "../Page";
import template from './error.tmpl';
import ButtonLink from "../../components/button/ButtonLink";

export class Page404 extends Page {
    constructor(props) {
        super({
            ...props,
            template,
            code: '404',
            message: "Something went wrong",
        });
        this.children.BackButton = new ButtonLink({
        text: 'Back to chats',
        path: '/messenger'
    })
    }
}

export class Page500 extends Page {
    constructor(props) {
        super({
            ...props,
            template,
            code: '500',
            message: "Internal Server Error",
        })
        this.children.BackButton = new ButtonLink({
            text: 'Back to chats',
            path: '/messenger'
        })
    }
}
