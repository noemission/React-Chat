import { MessageList, ChatAction, GenericAction, Message } from "../models"
import { combineReducers } from "redux"
import { UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT, SET_MESSAGE_READ } from "../constants"



export type ChatState = {
    readonly messageList: MessageList
    readonly onlineCount: number
}
const initialState: ChatState = {
    messageList: [
        {
            id: '262.85102975915197-955.9462143829574-792.5841198671267',
            text: `Lorem Ipsum is simply dummy text of the `,
            timestamp: new Date('2020-06-28T11:59:13.346Z'),
            username: 'someguy',
            read: false
        },
        {
            id: '262.85102975915197-955.9462143829574-792.5841198671268',
            text: `It is a long established fact that a reader will be distracted by the readable content`,
            timestamp: new Date('2020-06-28T11:59:15.346Z'),
            username: 'someguy',
            read: false
        }
    ],
    onlineCount: 0
}

const messageListReducer = (state: MessageList = initialState.messageList, action: ChatAction): MessageList => {
    switch (action.type) {
        case UPDATE_MESSAGE_LIST:
            return [
                ...state,
                {
                    ...action.payload,
                    timestamp: new Date(action.payload.timestamp),
                    read: false
                }

            ]
        case SET_MESSAGE_READ:
            return state.map((message: Message) => {
                if (message.id === (action.payload as unknown as string)) {
                    return {
                        ...message,
                        read: true
                    }
                }
                return message;
            })
        default:
            return state
    }
}

const onlineCountReducer = (state: number = initialState.onlineCount, action: GenericAction): number => {
    switch (action.type) {
        case UPDATE_ONLINE_COUNT:
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    messageList: messageListReducer,
    onlineCount: onlineCountReducer
})