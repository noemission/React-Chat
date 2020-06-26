import io from 'socket.io-client'
import { Store, Action, Dispatch } from 'redux'
import { wsConnected, wsDisconnected, wsReconnecting } from '../actions/websocketActions';
import { WS_CONNECT, WS_DISCONNECT, SEND_MESSAGE } from '../constants';
import { Message } from '../models';
import { GenericAction, updateMessageList, updateOnlineCount } from '../actions/chatActions';

const socketMiddleware = () => {
    let socket: SocketIOClient.Socket = null;

    const onConnect = (store: Store) => () => {
        console.log('websocket connected');
        store.dispatch(wsConnected())
    };

    const onDisconnect = (store: Store) => (reason: string) => {
        console.log('websocket disconnected', reason);
        store.dispatch(wsDisconnected())
    };

    const onReconnecting = (store: Store) => (attempt: number) => {
        console.log('websocket trying to reconnect for time: ', attempt);
        store.dispatch(wsReconnecting(attempt))
    };

    const onError = (store: Store) => (error: any) => {
        console.log('websocket error', error);
    };

    const onUpdateMessageList = (store: Store) => (message: Message) => {
        console.log('received a message ', message);
        store.dispatch(updateMessageList(message))
    };

    const onOnlineCount = (store: Store) => (count: number)=> {
        console.log('received a message ', count);
        store.dispatch(updateOnlineCount(count))
    };

    // the middleware part of this function
    return (store: Store) => (dispatch: Dispatch) => (action: GenericAction) => {
        switch (action.type) {
            case WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }

                // connect to the remote host
                socket = io('http://localhost:3000')

                // websocket handlers
                socket.on('connect', onConnect(store))
                socket.on('disconnect', onDisconnect(store))
                socket.on('reconnecting', onReconnecting(store))
                socket.on('UPDATE_MESSAGE_LIST', onUpdateMessageList(store))
                socket.on('ONLINE_COUNT', onOnlineCount(store))
                socket.on('error', onError(store))
                break;
            case WS_DISCONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case SEND_MESSAGE:
                socket.emit(SEND_MESSAGE, action.payload);
                break;
            default:
                console.log('the next action:', action);
                return dispatch(action);
        }
    };
};

export default socketMiddleware();
