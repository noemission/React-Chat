/* 
    Utility function for safely accessing the localstorage
*/
import { SettingsState } from "../store/reducers/settingsReducer";

const localStorage = window.localStorage;
const STORAGE_KEY = "Settings"

type OnChangeCallBack = (settings: SettingsState) => any
export default {
    onChange: (cb: OnChangeCallBack): () => void => {
        const func = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) return cb(JSON.parse(e.newValue))
        }
        window.addEventListener('storage', func)
        return () => window.removeEventListener('storage', func)
    },
    setSettings: (settings: SettingsState) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    },
    getSettings: (): SettingsState | null => {
        let data = localStorage.getItem(STORAGE_KEY)
        try {
            return JSON.parse(data)
        } catch (error) {
            return null;
        }
    },
    clear: () => {
        localStorage.clear();
    }

}