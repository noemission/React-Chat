import React, { useCallback } from "react";
import MessageList from "../../components/MessageList/MessageList";
import TextInput from "../../components/TextInput/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/models";
import { sendMessage } from "../../store/actions";
import classNames from "./chat.scss";

export default () => {
    const dispatch = useDispatch()
    const messageList = useSelector((state: RootState) => state.chat.messageList)
    const onNewText = useCallback(
        (text: string) => dispatch(sendMessage(text)),
        [dispatch]
    )

    
    return <div className={classNames.container}>
        <MessageList messages={messageList} />
        <TextInput onSubmit={onNewText} eraseValueAfterSubmit={true} />
    </div>
}