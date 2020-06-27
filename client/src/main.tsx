import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { wsConnect } from "./store/actions/websocketActions";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";



export default connect()(function App({ dispatch }: { dispatch: Dispatch }) {
    useEffect(() => {
        dispatch(wsConnect())
    })
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <Chat/>
                </Route>
                <Route path="/about">
                    <Settings />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>

    );
})