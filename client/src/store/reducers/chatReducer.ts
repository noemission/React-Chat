import { MessageList, ChatAction, GenericAction, Message } from "../models"
import { combineReducers } from "redux"
import { UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT, SET_MESSAGE_READ } from "../constants"



export type ChatState = {
    readonly messageList: MessageList
    readonly onlineCount: number
}
export const initialState: ChatState = {
    messageList: [],
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