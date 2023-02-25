import Router, { BlockConstructable } from './Router'
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', () => {

    global.window.history.back = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
        }
    };
    global.window.history.forward = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
        }
    }

    const getContentFake = sinon.fake.returns(document.createElement('div'));

    const BlockMock = class {
        getContent = getContentFake;
        show = sinon.fake()
    } as unknown as BlockConstructable;

    it('use() should return Router instance', () => {
        const result = Router.use('/', BlockMock);

        expect(result).to.eq(Router);
    });

    it('should render a page on start', () => {
        Router
            .use('/', BlockMock)
            .start();

        expect(getContentFake.callCount).to.eq(1);
    });

    describe('.back()', () => {
        it('should change state of history on back action', () => {
            Router
                .use('/', BlockMock)
                .start();

            Router.back();

            expect(window.history.length).to.eq(1);
        });
    });


});
