import Login from "./Login";
import Button from "../../components/button/Button";

const LoginPage = new Login({
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

export default LoginPage;