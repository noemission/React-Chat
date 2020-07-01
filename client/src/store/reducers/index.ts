import chatReducer from './chatReducer'
// The root reducer
import websocketReducer from './websocketReducer'
import { combineReducers } from 'redux'
import settingsReducer from './settingsReducer'

export default combineReducers({
    chat: chatReducer,
    websocket: websocketReducer,
    settings: settingsReducer
})