import './styles/style.scss';
import LoginPage from './pages/Login/LoginPage';

const pages = {
    '/login': () => LoginPage,
}

const location = window.location.pathname;
const app = document.querySelector('#app');

document.addEventListener('DOMContentLoaded', () => {
    const page = pages[location]()
    app.appendChild(page.getContent());
    page.dispatchComponentDidMount();
})