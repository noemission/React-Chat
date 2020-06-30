import React, { useCallback } from "react";
import MessageList from "../../components/MessageList/MessageList";
import TextInput from "../../components/TextInput/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/models";
import { sendMessage } from "../../store/actions";
import FullPageWrapper from "../../components/FullPageWrapper/FullPageWrapper";

export default () => {
    const dispatch = useDispatch()
    const messageList = useSelector((state: RootState) => state.chat.messageList)
    const sendWithCtrlEnter = useSelector((state: RootState) => state.settings.sendWithCtrlEnter)
    const onNewText = useCallback(
        (text: string) => dispatch(sendMessage(text)),
        [dispatch]
    )


    return <FullPageWrapper>
        <MessageList messages={messageList} />
        <TextInput sendMessageOnCtrlEnter={sendWithCtrlEnter} onSubmit={onNewText} eraseValueAfterSubmit={true} />
    </FullPageWrapper>
}