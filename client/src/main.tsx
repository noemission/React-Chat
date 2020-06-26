import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import MessageList from "./components/MessageList/MessageList";
import TextInput from "./components/TextInput/TextInput";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { wsConnect } from "./store/actions/websocketActions";



export default connect()(function App({ dispatch }: { dispatch: Dispatch }) {
    useEffect(() => {
        console.log('i run!', dispatch)
        dispatch(wsConnect())
    })
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/nomatch">No match</Link>
                    </li>
                </ul>
            </nav>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>

    );
})

function Home() {
    return <div>
        <MessageList />
        <TextInput />
    </div>
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
function NotFound() {
    return <h2>404 Page not found</h2>;
}