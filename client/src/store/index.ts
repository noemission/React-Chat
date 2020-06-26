import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import middlewares from './middlewares';

const store = createStore(
    reducer,
    compose(
        applyMiddleware(middlewares[0]),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store;