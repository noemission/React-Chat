import chatReducer from './chatReducer'
import websocketReducer from './websocketReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    chat: chatReducer,
    websocket: websocketReducer
})