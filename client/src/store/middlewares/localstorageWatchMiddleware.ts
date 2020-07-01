/* 
    A store middleware that watches for changes in the localstorage
    In case a change happened in another browser tab the settings will get updated in the current one
    That way we keep cross tab settings changes in sync.
*/
import { Dispatch } from 'redux'
import { LOCAL_STORAGE_WATCH } from '../constants';
import { GenericAction } from '../models';
import localStorage from '../../services/localStorage';
import { setSettings } from '../actions/settingsActions';

const localStorageMiddleware = () => {
    let removeOnChangeHandler: () => void = null;

    return () => (dispatch: Dispatch) => (action: GenericAction) => {
        switch (action.type) {
            case LOCAL_STORAGE_WATCH:
                if (!removeOnChangeHandler) {
                    removeOnChangeHandler = localStorage.onChange((newSettings) => dispatch(setSettings(newSettings)))
                }
                break;
            default:
                return dispatch(action);
        }
    };
};

export default localStorageMiddleware();
