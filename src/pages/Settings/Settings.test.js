import React from 'react';
import { mount } from 'enzyme';
import Settings from './Settings';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { defaultState } from '../../store/reducers/settingsReducer';
import RadioInputGroup from '../../components/RadioInputGroup/RadioInputGroup';
import UsernameSelector from '../../components/UsernameSelector/UsernameSelector';
import { setColor, setHour12, setSendWithCtrlEnter } from '../../store/actions/settingsActions';
import Button from '../../components/Button/Button';
import { resetToDefaults } from '../../store/actions';
import DropDown from '../../components/DropDown/DropDown';


const mockStore = configureStore([]);

let store = mockStore({
    settings: defaultState
});
let component = mount(
    <Provider store={store}>
        <Settings />
    </Provider>
);
describe('Settings Page', () => {

    beforeEach(() => {
        store = mockStore({
            settings: defaultState
        });

        component = mount(
            <Provider store={store}>
                <Settings />
            </Provider>
        );
    });
    it('Contains the correct elements', () => {
        expect(component.find(UsernameSelector).length).toEqual(1)
        expect(component.find(RadioInputGroup).length).toEqual(3)
        expect(component.find(DropDown).length).toEqual(1)
        expect(component.find(Button).length).toEqual(2)
    })

    // Color display tests
    it('Renders the correct interface colors', () => {
        const ColorSwitchComponent = component.find(RadioInputGroup).at(0)

        expect(ColorSwitchComponent.prop('options').map(o => o.value))
            .toEqual(store.getState().settings.availableColors)
    })
    it('Changes Interface Colors', () => {
        const ColorSwitchComponent = component.find(RadioInputGroup).at(0)

        ColorSwitchComponent.find('input').at(0).simulate('change')
        ColorSwitchComponent.find('input').at(1).simulate('change')

        expect(store.getActions()).toEqual([
            setColor('light'),
            setColor('dark')
        ])
    })

    // Clock display tests
    it('Renders the correct clock displays', () => {
        const ClockDisplaySwitchComponent = component.find(RadioInputGroup).at(1)

        expect(ClockDisplaySwitchComponent.prop('options').map(o => o.value))
            .toEqual([true, false])
    })
    it('Changes Clock Display', () => {
        const ClockDisplaySwitchComponent = component.find(RadioInputGroup).at(1)

        ClockDisplaySwitchComponent.find('input').at(0).simulate('change')
        ClockDisplaySwitchComponent.find('input').at(1).simulate('change')

        expect(store.getActions()).toEqual([
            setHour12(true),
            setHour12(false)
        ])
    })

    // Send Messages on CTRL+ENTER Functionality tests
    it('Renders the correct CTRL+ENTER options', () => {
        const CtrlEnterSwitchComponent = component.find(RadioInputGroup).at(2)

        expect(CtrlEnterSwitchComponent.prop('options').map(o => o.value))
            .toEqual([true, false])
    })
    it('Changes Send Messages on CTRL+ENTER Functionality', () => {
        const CtrlEnterSwitchComponent = component.find(RadioInputGroup).at(2)

        CtrlEnterSwitchComponent.find('input').at(0).simulate('change')
        CtrlEnterSwitchComponent.find('input').at(1).simulate('change')

        expect(store.getActions()).toEqual([
            setSendWithCtrlEnter(true),
            setSendWithCtrlEnter(false)
        ])
    })

    // Language selection tests
    it('Renders the correct language options', () => {
        const LanguageSelectComponent = component.find(DropDown).at(0)

        expect(LanguageSelectComponent.prop('options').map(o => o.value))
            .toEqual(store.getState().settings.languages)
    })

    // Reset to defauls tests
    it('Resets to default settings when the button is clicked', () => {
        const ResetToDefaultsComponent = component.find(Button).at(1)
        ResetToDefaultsComponent.simulate('click')
        expect(store.getActions()).toEqual([
            resetToDefaults()
        ])
    })
});

