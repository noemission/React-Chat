import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// @ts-ignore
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    // @ts-ignore
    observe() {
        return null;
    }
    // @ts-ignore
    unobserve() {
        return null;
    }
};