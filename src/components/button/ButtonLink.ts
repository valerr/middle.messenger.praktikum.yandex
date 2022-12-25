import Button from "./Button";
import Router from "../../utils/Router";
import { Props as ButtonProps } from "./Button";

interface ButtonLinkProps extends ButtonProps {
    path: string;
}

export default class ButtonLink extends Button {
    router = Router
    constructor(props: ButtonLinkProps) {
        super({ ...props,
            events: {
                click: () => this.navigate(props.path)
            }
        });
    }

    navigate(path: string) {
        this.router.go(path);
    }
}

