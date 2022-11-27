import './styles/style.scss';
import Login from './pages/Login/Login';
import MainPage from './pages/Main/MainPage';
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { Page404, Page500 } from "./pages/Error/error";
import Chats from "./pages/Chats/Chats";

const pages: Record<string, any> = {
    '/': () => MainPage,
    '/login': () => Login,
    '/profile': () => Profile,
    '/register': () => Register,
    '/404': () => Page404,
    '/500': () => Page500,
    '/chats': () => Chats,
}

const location = window.location.pathname;
const app = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
    const page = pages[location]();
    app!.appendChild(page.getContent());
    page.dispatchComponentDidMount();
})