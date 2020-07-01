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
