import './styles/style.scss';
import Login from './pages/Login/Login';
import MainPage from './pages/Main/MainPage';
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Password from "./pages/Settings/Password";
import Register from "./pages/Register/Register";
import { Page404, Page500 } from "./pages/Error/error";
import Chats from "./pages/Chats/Chats";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";

export enum routes {
    Main ='/',
    Login = '/login',
    Profile = '/profile',
    Register = '/sign-up',
    Page404 = '/404',
    Page500 = '/500',
    Chats = '/messenger',
    Settings = '/settings',
    Password = '/settings/password'
}

document.addEventListener('DOMContentLoaded', async () => {
    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case routes.Main:
        case routes.Register:
            isProtectedRoute = false;
            break;
    }

    let user;
        try {
            user = await AuthController.fetchUser();

            if (isProtectedRoute) {
                if (user) {
                    Router.go(routes.Chats)
                } else {
                    Router.go(routes.Login)
                }
            }

            if ((window.location.pathname === '/' && user) || (window.location.pathname === '/sign-up' && user)) {
                Router.go(routes.Chats)
            }
        } catch (e) {
            console.log(e)
            if (isProtectedRoute) {
                Router.go(routes.Main);
            }
        }

    Router
        .use(routes.Main, Login)
        .use(routes.Login, Login)
        .use(routes.Register, Register)
        .use(routes.Profile, Profile)
        .use(routes.Settings, Settings)
        .use(routes.Chats, Chats)
        .use(routes.Page404, Page404)
        .use(routes.Page500, Page500)

        .use(routes.Password, Password)

    Router.start();

    if (!Object.values(routes).includes(window.location.pathname)) {
        Router.go(routes.Page404)
    }
})
