import React from "react";
import { connect, useSelector } from 'react-redux'
import { ChatState } from "../../store/reducers/chatReducer";
import Message from "../Message/Message";
import { StateObject, MessageList } from "../../store/models";

type Props = {
    messages: MessageList
}
export default (props: Props) => {
    const { messages } = props;

    return (
        <div>
            {messages.map(message => <Message key={message.id} text={message.text} />)}
        </div>
    );
}