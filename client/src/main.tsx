import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { wsConnect } from "./store/actions/websocketActions";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";
import { watchLocalStorage } from "./store/actions";

import classNames from './styles/layout.scss'


export default connect()(function App({ dispatch }: { dispatch: Dispatch }) {
    useEffect(() => {
        dispatch(wsConnect())
        dispatch(watchLocalStorage())
    })
    return (
        <div className={ `container ${classNames.page}` }>
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

    );
})