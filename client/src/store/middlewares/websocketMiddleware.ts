/* 
    A store middleware that handles all the necessary operations
    between the websocket server and the client app
    Responsibilities of this middleware is opening the socket
    watching for server messages and dispatching the appropriate actions in any case
*/
import io from 'socket.io-client'
import { Store, Dispatch } from 'redux'
import { wsConnected, wsDisconnected, wsReconnecting } from '../actions/websocketActions';
import { WS_CONNECT, WS_DISCONNECT, SEND_MESSAGE } from '../constants';
import { Message, GenericAction, RootState } from '../models';
import { updateMessageList, updateOnlineCount } from '../actions/chatActions';
import isUsernameTaken from '../../services/isUsernameTaken';
import getRandomUsername from '../../services/randomUsername';
import { setUserName } from '../actions/settingsActions';
import notificationFile from '../../../assets/notification.mp3'
import { getUsername } from '../selectors/username';

const socketMiddleware = () => {
    let socket: SocketIOClient.Socket = null;

    const onConnect = (store: Store) => async () => {
        store.dispatch(wsConnected())
        // The first time someone joins the chat will not have a username
        // Since the app relies on a valid and unique username the following piece of code
        // assigns a random and unique username to the user
        const { username } = (store.getState() as RootState).settings
        if (!username) {
            let available;
            do {
                let randomUsername = getRandomUsername()
                available = await isUsernameTaken(randomUsername)
                if (available) {
                    store.dispatch(setUserName(randomUsername))
                }
            } while (!available)
        }
    };

    const onDisconnect = (store: Store) => (reason: string) => store.dispatch(wsDisconnected())

    const onReconnecting = (store: Store) => (attempt: number) => store.dispatch(wsReconnecting(attempt))

    const onError = (store: Store) => (error: any) => console.log('websocket error', error);

    const onUpdateMessageList = (store: Store) => (message: Message) => {
        store.dispatch(updateMessageList(message))
        if(message.username !== getUsername(store.getState())){
            const notificationSound = new Audio(notificationFile);
            notificationSound.play()
        }
    }

    const onOnlineCount = (store: Store) => (count: number) => store.dispatch(updateOnlineCount(count))

    return (store: Store) => (dispatch: Dispatch) => (action: GenericAction) => {
        switch (action.type) {
            case WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = io(process.env.SERVER_URL)

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
                break;
            case SEND_MESSAGE:
                const { username } = (store.getState() as RootState).settings
                socket.emit(SEND_MESSAGE, {
                    text: action.payload,
                    username
                });
                break;
            default:
                return dispatch(action);
        }
    };
};

export default socketMiddleware();
