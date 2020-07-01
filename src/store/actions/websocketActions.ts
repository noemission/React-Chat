import { WS_CONNECT, WS_CONNECTED, WS_DISCONNECT, WS_DISCONNECTED, WS_RECONNECTING } from "../constants"

export const wsConnect = () => ({ type: WS_CONNECT })
export const wsConnected = () => ({ type: WS_CONNECTED })
export const wsDisconnect = () => ({ type: WS_DISCONNECT })
export const wsDisconnected = () => ({ type: WS_DISCONNECTED })
export const wsReconnecting = (payload: number) => ({ type: WS_RECONNECTING, payload })