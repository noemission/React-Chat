import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './store/reducer';
import middlewares from './store/middlewares';

console.log(reducer)

const store = createStore(
    reducer,
    compose(
        applyMiddleware(...middlewares),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store;