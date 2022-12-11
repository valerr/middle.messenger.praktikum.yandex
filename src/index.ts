import './styles/style.scss';
import Login from './pages/Login/Login';
import MainPage from './pages/Main/MainPage';
import Profile, {changeProfile} from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { Page404, Page500 } from "./pages/Error/error";
import Chats from "./pages/Chats/Chats";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";

enum routes {
    Main ='/',
    Login = '/login',
    Profile = '/profile',
    Register = '/sign-up',
    Page404 = '/404',
    Page500 = '/500',
    Chats = '/messenger',
    Settings = '/settings'
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

            if (!isProtectedRoute) {
                Router.go(routes.Chats)
            }

            if ((window.location.pathname === '/' && user) || (window.location.pathname === 'sign-up' && user)) {
                Router.go('/messenger')
            }
        } catch (e) {
            if (isProtectedRoute) {
                Router.go(routes.Main);
            }
        }

    Router
        .use(routes.Main, Login)
        .use(routes.Login, Login)
        .use(routes.Register, Register)
        .use(routes.Profile, Profile)
        .use(routes.Chats, Chats)
        .use(routes.Page404, Page404)
        .use(routes.Page404, Page500)
        .use(routes.Settings, changeProfile)

    Router.start();
})
