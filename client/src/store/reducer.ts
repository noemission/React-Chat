
import * as actions from './actions';
import { WS_CONNECTED, WS_DISCONNECTED, WS_RECONNECTING, UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT } from './constants';
import { MessageList } from './models';
import { combineReducers } from "redux";

export type ChatState = {
    readonly messageList: MessageList
    readonly onlineCount: number
}
const initialState: ChatState = {
    messageList: [],
    onlineCount: 0
}

function reducer(state: MessageList = [], action: actions.ChatAction): MessageList {
    switch (action.type) {
        case UPDATE_MESSAGE_LIST:
            return [...state, action.payload]
        default:
            return state
    }
}

function reducer3(state: number = 0, action: actions.GenericAction): number {
    switch (action.type) {
        case UPDATE_ONLINE_COUNT:
            return action.payload
        default:
            return state
    }
}


export type WSState = {
    readonly connected: boolean
    readonly reconnecting: boolean
}
const initialState2: WSState = {
    connected: false,
    reconnecting: false
}

function reducer2(state: WSState = initialState2, action: actions.GenericAction): WSState {
    switch (action.type) {
        case WS_CONNECTED:
            return {
                ...state,
                connected: true,
                reconnecting: false
            }
        case WS_DISCONNECTED:
            return {
                ...state,
                connected: false,
                reconnecting: false
            }
        case WS_RECONNECTING:
            return {
                ...state,
                connected: false,
                reconnecting: true
            }
        default:
            return state
    }
}

export default combineReducers({
    chat: combineReducers({
        messageList: reducer,
        onlineCount: reducer3
    }),
    websocket: reducer2
})