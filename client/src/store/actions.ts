import { SEND_MESSAGE, WS_CONNECT, WS_DISCONNECT, WS_CONNECTED, WS_DISCONNECTED, WS_RECONNECTING, UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT } from './constants';
import { Message } from './models'

export type GenericAction = {
    readonly type: string;
    readonly payload?: any
};
export type ChatAction = {
    readonly type: string;
    readonly payload: Message
};

export const sendMessage = (payload: Message): ChatAction => ({ type: SEND_MESSAGE, payload });
export const updateMessageList = (payload: Message): ChatAction => ({ type: UPDATE_MESSAGE_LIST, payload });
export const updateOnlineCount = (payload: number): GenericAction => ({ type: UPDATE_ONLINE_COUNT, payload });

export const wsConnect = () => ({ type: WS_CONNECT })
export const wsConnected = () => ({ type: WS_CONNECTED })
export const wsDisconnect = () => ({ type: WS_DISCONNECT })
export const wsDisconnected = () => ({ type: WS_DISCONNECTED })
export const wsReconnecting = (payload: number) => ({ type: WS_RECONNECTING, payload })