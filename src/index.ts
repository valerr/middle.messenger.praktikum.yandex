import './styles/style.scss';
import Login from './pages/Login/Login';
import MainPage from './pages/Main/MainPage';
import Profile, {changeProfile} from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { Page404, Page500 } from "./pages/Error/error";
import Chats from "./pages/Chats/Chats";
import Router from "./utils/Router";

enum routes {
    Main ='/',
    Login = '/login',
    Profile = '/profile',
    Register = '/register',
    Page404 = '/404',
    Page500 = '/500',
    Chats = '/chats',
    Settings = '/settings'
}

document.addEventListener('DOMContentLoaded', () => {
    Router
        .use(routes.Main, MainPage)
        .use(routes.Login, Login)
        .use(routes.Register, Register)
        .use(routes.Profile, Profile)
        .use(routes.Chats, Chats)
        .use(routes.Page404, Page404)
        .use(routes.Page404, Page500)
        .use(routes.Settings, changeProfile)

    Router.start();
})
