import React from "react";
import { connect } from 'react-redux'
import { sendMessage, wsConnect, wsDisconnect } from "../store/actions";

const mapDispatchToProps = { sendMessage, wsConnect, wsDisconnect }
type Props = typeof mapDispatchToProps
type State = {
    inputValue: string;
};

class TextInput extends React.Component<Props, State> {
    state: State = {
        inputValue: ""
    };
    onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ inputValue: event.target.value })
    onSubmit = (event : React.FormEvent) => {
        event.preventDefault()
        this.props.sendMessage({
            id: `${Math.random() * 1000}-${Math.random() * 1000}-${Math.random() * 1000}`,
            text: this.state.inputValue,
            timestamp: new Date(),
            username: 'someguy'
        })
        this.setState({ inputValue: "" })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onValueChange} value={this.state.inputValue} type="text" />
                    <button >Submit</button>
                </form>
                <button onClick={this.props.wsConnect}>Connect</button>
                <button onClick={this.props.wsDisconnect}>Disconnect</button>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(TextInput)