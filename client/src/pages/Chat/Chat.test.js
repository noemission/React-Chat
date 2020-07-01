import React from 'react';
import { mount } from 'enzyme';
import Chat from './Chat';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import chatReducer, { initialState } from '../../store/reducers/chatReducer';
import { defaultState } from '../../store/reducers/settingsReducer';
import { act } from 'react-dom/test-utils';
import FullPageWrapper from '../../components/FullPageWrapper/FullPageWrapper';
import MessageList from '../../components/MessageList/MessageList';
import TextInput from '../../components/TextInput/TextInput';
import { sendMessage, updateMessageList } from '../../store/actions';


const mockStore = configureStore([]);

// @ts-ignore
const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        wrapper.update();
    });
};
let store = mockStore({
    chat: initialState,
    settings: defaultState
});
let component = mount(
    <Provider store={store}>
        <Chat />
    </Provider>
);
waitForComponentToPaint(component);

describe('Chat Page', () => {

    beforeEach(() => {

        store = mockStore({
            chat: initialState,
            settings: defaultState
        });
        component = mount(
            <Provider store={store}>
                <Chat />
            </Provider>
        );
        waitForComponentToPaint(component)
    });
    it('Contains the correct elements', () => {
        expect(component.find(FullPageWrapper).length).toEqual(1)
        expect(component.find(MessageList).length).toEqual(1)
        expect(component.find(TextInput).length).toEqual(1)
    })
    it('Contains the right array of messages', () => {
        const MessageListComponent = component.find(MessageList)
        expect(MessageListComponent.prop('messages'))
            .toEqual(store.getState().chat.messageList)
    })
    it('Handles the sending of a message', () => {
        const TextInputComponent = component.find(TextInput)
        // @ts-ignore
        TextInputComponent.find('textarea').at(0).getDOMNode().value = 'some random text'
        TextInputComponent.find('textarea').at(0).simulate('change')
        
        TextInputComponent.find('button').at(0).simulate('click')

        expect(store.getActions()).toEqual([
            sendMessage('some random text')
        ])
    })
    it('Updates the message list on new message', () => {
        const newMessage = {
            id : '' + Math.random(),
            read: false,
            text: 'an awesome text',
            timestamp: new Date,
            username: 'a username'
        }
        store = mockStore({
            chat: chatReducer(store.getState().chat, updateMessageList(newMessage)),
            settings: defaultState
        });
        component = mount(
            <Provider store={store}>
                <Chat />
            </Provider>
        );
        waitForComponentToPaint(component)
        const MessageListComponent = component.find(MessageList)
        const messages = MessageListComponent.prop('messages')
        expect(messages).toEqual(store.getState().chat.messageList)

        expect(messages[messages.length -1]).toEqual(newMessage)
    })

});

