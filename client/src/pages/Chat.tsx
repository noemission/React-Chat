import React, { useCallback } from "react";
import MessageList from "../components/MessageList/MessageList";
import TextInput from "../components/TextInput/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { StateObject } from "../store/models";
import { sendMessage } from "../store/actions";

export default () => {
    const dispatch = useDispatch()
    const messageList = useSelector((state: StateObject) => state.chat.messageList)
    const onNewText = useCallback(
        (text: string) => dispatch(sendMessage({
            id: `${Math.random() * 1000}-${Math.random() * 1000}-${Math.random() * 1000}`,
            text,
            timestamp: new Date(),
            username: 'someguy'
        })),
        [dispatch]
    )

    return <div>
        <MessageList messages={messageList} />
        <TextInput onSubmit={onNewText} />
    </div>
}