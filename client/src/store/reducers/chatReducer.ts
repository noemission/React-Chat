import { MessageList } from "../models"
import { combineReducers } from "redux"
import { UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT } from "../constants"
import { ChatAction, GenericAction } from "../actions/chatActions"


export type ChatState = {
    readonly messageList: MessageList
    readonly onlineCount: number
}
const initialState: ChatState = {
    messageList: [],
    onlineCount: 0
}

const messageListReducer = (state: MessageList = [], action: ChatAction): MessageList => {
    switch (action.type) {
        case UPDATE_MESSAGE_LIST:
            return [...state, action.payload]
        default:
            return state
    }
}

const onlineCountReducer = (state: number = 0, action: GenericAction): number => {
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