import { StringAction, BooleanAction, LanguageChangeAction, Colors, ColorChangeAction } from "../models";
import { UPDATE_MESSAGE_LIST, SET_USERNAME, SET_COLOR, SET_HOUR12, SET_SEND_WITH_CTRL_ENTER, SET_SELECTED_LANGUAGE } from "../constants";
import { Languages } from "../models";

export const setUserName = (payload: string): StringAction => ({ type: SET_USERNAME, payload });
export const setColor = (payload: typeof Colors[number]): ColorChangeAction => ({ type: SET_COLOR, payload });
export const setHour12 = (payload: boolean): BooleanAction => ({ type: SET_HOUR12, payload });
export const setSendWithCtrlEnter = (payload: boolean): BooleanAction => ({ type: SET_SEND_WITH_CTRL_ENTER, payload });
export const setSelectedLanguage = (payload: typeof Languages[number]): LanguageChangeAction => ({ type: SET_SELECTED_LANGUAGE, payload });