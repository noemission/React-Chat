import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';

const onClick = () => { }
describe('Button renders its children', () => {
    it('Renders children that are simple text', () => {
        const btn = shallow(<Button onClick={onClick}>Hello</Button>);
        expect(btn.text()).toEqual('Hello')

    })
    it('Renders children that are elements', () => {
        const btn = shallow(<Button onClick={onClick}><span>Hello</span></Button>);
        expect(btn.exists('span')).toEqual(true)
        expect(btn.find('span').text()).toEqual('Hello')
    })
});

describe('Button handles its props', () => {
    it('It calls the onClick prop when it is being clicked', () => {
        const onClick = jest.fn()
        shallow(<Button onClick={onClick} />).simulate('click');
        expect(onClick.mock.calls.length).toEqual(1)
    })
    it('Assigns the classes that were passed from props', () => {
        const btn = shallow(<Button onClick={onClick} className="some-class" />);
        expect(btn.hasClass('some-class')).toEqual(true)
    })
    it('Assigns the styles that were passed from props', () => {
        const btn = mount(<Button onClick={onClick} style={ { height : '150px' } } />);
        // @ts-ignore
        expect(btn.getDOMNode().style).toHaveProperty('height', '150px');
    })
});