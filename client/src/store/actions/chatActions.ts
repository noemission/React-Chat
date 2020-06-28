import { Message, ChatAction, GenericAction, StringAction } from "../models";
import { SEND_MESSAGE, UPDATE_MESSAGE_LIST, UPDATE_ONLINE_COUNT, SET_MESSAGE_READ } from "../constants";


export const sendMessage = (payload: string): StringAction => ({ type: SEND_MESSAGE, payload });
export const setMessageRead = (payload: string): StringAction => ({ type: SET_MESSAGE_READ, payload });
export const updateMessageList = (payload: Message): ChatAction => ({ type: UPDATE_MESSAGE_LIST, payload });
export const updateOnlineCount = (payload: number): GenericAction => ({ type: UPDATE_ONLINE_COUNT, payload });