import { ChatState } from "./reducers/chatReducer";
import { WSState } from "./reducers/websocketReducer";

export const Languages = <const>['English', 'Greek']
export const Colors = <const>['light', 'dark']
export interface UserSettings {
    username: string,
    avatar: string,
    color: typeof Colors[number],
    hour12: boolean,
    sendWithCtrlEnter: boolean,
    languages: typeof Languages,
    selectedLanguage: typeof Languages[number]
}

export interface Message {
    id: string,
    text: string,
    username: string,
    timestamp: Date
}
export type MessageList = Message[]

export type GenericAction = {
    readonly type: string;
    readonly payload?: any;
};
export type ChatAction = {
    readonly type: string;
    readonly payload: Message;
};
export type StringAction = {
    readonly type: string;
    readonly payload: string;
};
export type BooleanAction = {
    readonly type: string;
    readonly payload: boolean;
};
export type LanguageChangeAction = {
    readonly type: string;
    readonly payload: typeof Languages[number];
};
export type ColorChangeAction = {
    readonly type: string;
    readonly payload: typeof Colors[number];
};

export type ActionTypes = ChatAction | StringAction | BooleanAction | LanguageChangeAction | ColorChangeAction

export type StateObject = {
    chat: ChatState,
    websocket: WSState
}