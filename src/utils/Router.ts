import Route from "./Route";
import Block from "./Block";

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private history = window.history;


    constructor(private _rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, this._rootQuery);
        this.routes.push(route);
        return this
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        }).bind(this)
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) return


        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this._onRoute(pathname)
        this.history.pushState({}, '', pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('body');
