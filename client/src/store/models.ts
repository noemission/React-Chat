export interface User {
    username: string,
    avatar: string,
    settings: UserSettings
}
export interface UserSettings {
    color: "light" | "dark",
    hour12: boolean,
    sendWithCtrlEnter: boolean,
    languages: string[]
}

export interface Message {
    id: string,
    text: string,
    username: string,
    timestamp: Date
}
export type MessageList = Message[] 
