import { assert } from 'chai';
import Block from "./Block";


describe('Block', () => {
    class ComponentMock extends Block {
        render(): DocumentFragment {
            return this.compile("text", {});
        }
    }

    it('should render text',  () => {
        const component = new ComponentMock('div', {});

        assert.equal(component.getContent().innerHTML, 'text');
    });

    it("compiles", () => {
        const component = new ComponentMock('div', {});
        const template = `<div><span>inner text</span></div>`

        assert.equal(component.compile(template, {}).firstElementChild!.innerHTML, '<span>inner text</span>')
    });
});
