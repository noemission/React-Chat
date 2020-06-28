import React, { useEffect, useRef } from "react";
import { connect, useSelector } from 'react-redux'
import { ChatState } from "../../store/reducers/chatReducer";
import Message from "../Message/Message";
import { MessageList, RootState } from "../../store/models";
import classNames from './messageList.scss'

type Props = {
    messages: MessageList
}
export default (props: Props) => {
    const username = useSelector((state: RootState) => state.settings.username)
    const { messages } = props;
    const refContainer = useRef(null);

    const scrollToBottom = () => {
        const bottom = (refContainer.current as HTMLElement).scrollHeight;
        (refContainer.current as HTMLElement).scrollTo(0, bottom)
    }
    useEffect(() => {
        document.hasFocus() && scrollToBottom()
    }, [messages.length])


    return (
        <div ref={refContainer} className={classNames.container}>
            <div className={classNames.innerContainer}>
                {/* fix because justify-content: flex-end; and vertical scroll don't play well together */}
                <div className={classNames.flexEndFix}></div>

                {messages.map(message => <Message
                    id={message.id}
                    ownMessage={message.username === username}
                    key={message.id}
                    text={message.text}
                    timestamp={message.timestamp}
                    username={message.username} />)}
            </div>
        </div>
    );
}