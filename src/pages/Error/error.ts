import Page from "../Page";
import Button from "../../components/button/Button";
import template from './error.tmpl';

export const Page404 = new Page({
    template,
    code: '404',
    message: "Something went wrong",
    BackButton: new Button({
        text: 'Back to chats',
        events: {
            'click': () => location.href=`${location.origin}/chats`,
        }
    })
})

export const Page500 = new Page({
    template,
    code: '500',
    message: "Internal Server Error",
    BackButton: new Button({
        text: 'Back to chats',
        events: {
            'click': () => location.href=`${location.origin}/chats`,
        }
    })
})
