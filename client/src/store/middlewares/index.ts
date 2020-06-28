import websocketMiddleware from './websocketMiddleware'
import localstorageWatchMiddleware from './localstorageWatchMiddleware'



export default[
    websocketMiddleware,
    localstorageWatchMiddleware
]