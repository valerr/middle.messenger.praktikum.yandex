import Button from "../../components/button/Button";
import template from './profile.tmpl';
import ButtonLink from "../../components/button/ButtonLink";
import AuthController from "../../controllers/AuthController";
import Router from "../../utils/Router";
import store, {withStore} from "../../utils/Store";
import Block from "../../utils/Block";
import Field from "../../components/profile/Field";
import Avatar from "../../components/profile/Avatar";

const info = [
    {
        key: 'First name',
        name: 'first_name',
    },
    {
        key: 'Last name',
        name: 'second_name',
    },
    {
        key: 'Display name',
        name: 'display_name',
    },
    {
        key: 'Login',
        name: 'login',
    },
    {
        key: 'Email',
        name: 'email',
    },
    {
        key: 'Phone',
        name: 'phone',
    },
]


type Props = Record <string, any>
class Profile extends Block<Props> {
    constructor(props: Props) {
        super('main', {...props, info, name: store.getState().user!.first_name});
    }

    render() {
        return this.compile(template, this.props);
    }

    init() {
        this.children!.chatsButton = new ButtonLink({
            className: 'back-button',
            path: '/messenger'
        })

        this.children!.logOutButton = new Button({
            text: 'Log out',
            events: {
                'click': () => {
                    AuthController.logout().then(() => Router.go('/'))
                }
            }
        })
        this.children!.ChangeProfileButton = new ButtonLink({
            text: 'Edit profile',
            className: 'profile-editing',
            path: '/settings'
        })
        // @ts-ignore
        this.children!.fields = info.map(({ key }) => new Field({
            className: 'info-item',
            name: key,
        }))
        this.children!.changePassword = new ButtonLink({
            text: 'Change password',
            path: '/settings/password'
        });
        this.children!.avatar = new Avatar({});

        AuthController
            .fetchUser()
            .then(() => this.userUpdated())
            .catch(e => console.log(e))
        super.init()
    }

    userUpdated() {
        const { user } = store.getState();
        if (user!.avatar) {
            this.element.querySelector('.profile-image')!
                .innerHTML = `<img src=https://ya-praktikum.tech/api/v2/resources${user!.avatar}>`
        }
    }

    componentDidUpdate(_oldProps: Props, newProps: Props): boolean {
        (newProps?.user && this.children!.fields)?.forEach((field: Field, i: number) => {
            field.setProps({ value: newProps?.user[info[i].name] });
        });

        return false;
    }
}


const profileWithStore = withStore((state) => ({
    user: state.user
}))

// @ts-ignore
export default profileWithStore(Profile)

