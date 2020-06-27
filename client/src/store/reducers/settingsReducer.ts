import { UserSettings, ActionTypes, Colors, Languages } from "../models"
import { SET_USERNAME, SET_COLOR, SET_HOUR12, SET_SEND_WITH_CTRL_ENTER, SET_SELECTED_LANGUAGE } from "../constants"

interface SettingsState extends UserSettings { }
const initialState: SettingsState = {
    username: "",
    avatar: '',
    color: 'light',
    hour12: true,
    sendWithCtrlEnter: false,
    languages: ["English", "Greek"],
    selectedLanguage: "English",
}

export default (state: SettingsState = initialState, action: ActionTypes): SettingsState => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload as string
            }
        case SET_COLOR:
            return {
                ...state,
                color: action.payload as typeof Colors[number]
            }
        case SET_HOUR12:
            return {
                ...state,
                hour12: action.payload as boolean
            }
        case SET_SEND_WITH_CTRL_ENTER:
            return {
                ...state,
                sendWithCtrlEnter: action.payload as boolean
            }
        case SET_SELECTED_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.payload as typeof Languages[number]
            }
        default:
            return state
    }
}