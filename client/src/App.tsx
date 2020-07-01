/* 
    The starting point of the application
    This component has to handle the routing,
    initiate the websocket connection, and start the local storage observer
*/
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { wsConnect } from "./store/actions/websocketActions";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";
import { watchLocalStorage } from "./store/actions";

import classNames from './styles/layout.scss'
import { getTheme } from "./store/selectors/theme";

export default connect()(function App({ dispatch }: { dispatch: Dispatch }) {
    const theme = useSelector(getTheme);
    useEffect(() => {
        dispatch(wsConnect())
        dispatch(watchLocalStorage())
    })
    return (
        <div className={`container-fluid ${classNames.page} theme-${theme}`}>
            <div className={`container ${classNames.content}`}>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Chat />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
})