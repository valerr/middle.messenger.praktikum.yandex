import Page from "../Page";
import Button from "../../components/button/Button";
import template from './login.tmpl';

const Login = new Page({
    template,
    signInButton: new Button({
        text: 'Sign in',
        className: 'primary-button',
        events: {
            'click': () => location.href=`${location.origin}/chats`,
        }
    }),
    registerButton: new Button({
        text: 'Create account',
        className: 'secondary-button',
        events: {
            'click': () => location.href=`${location.origin}/register`,
        }
    })
})

export default Login;