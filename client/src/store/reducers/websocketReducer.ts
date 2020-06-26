import { WS_CONNECTED, WS_DISCONNECTED, WS_RECONNECTING } from "../constants"
import { GenericAction } from "../actions/chatActions"

export type WSState = {
    readonly connected: boolean
    readonly reconnecting: boolean
}
const initialState: WSState = {
    connected: false,
    reconnecting: false
}


const websocketReducer = (state: WSState = initialState, action: GenericAction): WSState => {
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

export default websocketReducer