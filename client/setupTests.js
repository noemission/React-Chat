import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.IntersectionObserver = class IntersectionObserver {
    constructor() { }

    observe() {
        return null;
    }

    unobserve() {
        return null;
    }
};