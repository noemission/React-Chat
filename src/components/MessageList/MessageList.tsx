/* 
    The component that renders the list of
    sent and received messages on the chat
*/
import React, { useEffect, useRef } from "react";
import { useSelector } from 'react-redux'
import Message from "../Message/Message";
import { MessageList, RootState } from "../../store/models";
import classNames from './messageList.scss'
import { CSSTransition,    TransitionGroup } from "react-transition-group";


type Props = {
    messages: MessageList
}
export default (props: Props) => {
    const username = useSelector((state: RootState) => state.settings.username)
    const { messages } = props;
    const refContainer = useRef(null);

    const scrollToBottom = () => {
        console.log('need to scroll')
        const bottom = (refContainer.current as HTMLElement).scrollHeight;
        (refContainer.current as HTMLElement).scrollTo(0, bottom + 100)
    }
    useEffect(() => {
        document.hasFocus() && scrollToBottom()
    }, [messages.length])


    return (
        <div ref={refContainer} className={classNames.container}>
            <div className={classNames.innerContainer}>
                {/* fix because justify-content: flex-end; and vertical scroll don't play well together */}
                <div className={classNames.flexEndFix}></div>
                { /* @ts-ignore */}
                <TransitionGroup>

                    {messages.map(message => 
                    <CSSTransition
                        key={message.id}
                        timeout={500}
                        classNames="message">
                    <Message
                        id={message.id}
                        ownMessage={message.ownMessage}
                        key={message.id}
                        text={message.text}
                        timestamp={message.timestamp}
                        username={message.username} />
                    </CSSTransition>)}
                </TransitionGroup>
            </div>
        </div>
    );
}