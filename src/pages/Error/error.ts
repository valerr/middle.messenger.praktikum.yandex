import Page from "../Page";
import template from './error.tmpl';
import ButtonLink from "../../components/button/ButtonLink";

export const Page404 = new Page({
    template,
    code: '404',
    message: "Something went wrong",
    BackButton: new ButtonLink({
        text: 'Back to chats',
        path: '/messenger'
    })
})

export const Page500 = new Page({
    template,
    code: '500',
    message: "Internal Server Error",
    BackButton: new ButtonLink({
        text: 'Back to chats',
        path: '/messenger'
    })
})
