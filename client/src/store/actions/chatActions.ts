import { Message, ChatAction, GenericAction } from "../models";
import { SEND_MESSAGE, UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT } from "../constants";


export const sendMessage = (payload: Message): ChatAction => ({ type: SEND_MESSAGE, payload });
export const updateMessageList = (payload: Message): ChatAction => ({ type: UPDATE_MESSAGE_LIST, payload });
export const updateOnlineCount = (payload: number): GenericAction => ({ type: UPDATE_ONLINE_COUNT, payload });