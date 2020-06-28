import { createStore, applyMiddleware, compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import reducer from './reducers';
import middlewares from './middlewares';


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
)
export default store;