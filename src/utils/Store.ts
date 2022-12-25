import { set } from './helpers';
import EventBus from './EventBus';
import Block from './Block';
import { User } from '../api/AuthAPI';
import {Chat} from "../controllers/ChatController";

export enum StoreEvents {
    Updated = 'updated'
}

interface State {
    user: User;
    chats: [],
    currentChat: Record<string, Chat>
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

// @ts-ignore
window.store = store;
type Props = Record <string, any>
export function withStore<SP>(mapStateToProps: (state: State) => SP) {
    return function wrap<P>(Component: typeof Block<Props>){

        return class WithStore extends Component {

            constructor(props: Omit<P, keyof SP>) {
                let previousState = mapStateToProps(store.getState());

                // @ts-ignore
                super({ ...(props as Props), ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    previousState = stateProps;

                    this.setProps({ ...stateProps as Props });
                });

            }

        }

    }
}

export default store;
