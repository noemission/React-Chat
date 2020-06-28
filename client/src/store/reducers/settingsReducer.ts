import { UserSettings, ActionTypes, Colors, Languages } from "../models"
import { SET_USERNAME, SET_COLOR, SET_HOUR12, SET_SEND_WITH_CTRL_ENTER, SET_SELECTED_LANGUAGE, SET_SETTINGS } from "../constants"
import localStorage from "../../services/localStorage";

export interface SettingsState extends UserSettings { }
const defaultState: SettingsState = {
    username: "",
    avatar: '',
    availableColors: ["light", "dark"],
    color: 'light',
    hour12: true,
    sendWithCtrlEnter: false,
    languages: ["English", "Greek"],
    selectedLanguage: "English",
}

const initialState: SettingsState = (() => {
    const savedSettings = localStorage.getSettings()
    if (savedSettings !== null) return savedSettings
    return defaultState;
})();

export default (state: SettingsState = initialState, action: ActionTypes): SettingsState => {

    let newState = state;
    switch (action.type) {
        case SET_USERNAME:
            newState = {
                ...state,
                username: action.payload as string
            }
            break;
        case SET_COLOR:
            newState = {
                ...state,
                color: action.payload as typeof Colors[number]
            }
            break;
        case SET_HOUR12:
            newState = {
                ...state,
                hour12: action.payload as boolean
            }
            break;
        case SET_SEND_WITH_CTRL_ENTER:
            newState = {
                ...state,
                sendWithCtrlEnter: action.payload as boolean
            }
            break;
        case SET_SELECTED_LANGUAGE:
            newState = {
                ...state,
                selectedLanguage: action.payload as typeof Languages[number]
            }
            break;
        case SET_SETTINGS:
            console.log("setting setting",action.payload)
            newState = {
                ...state,
                ...action.payload as SettingsState
            }
            break;
        default:
            break;
    }
    localStorage.setSettings(newState)
    return newState;
}