import React, { useRef, useState, createRef, useEffect, useCallback } from "react";
import formatTime from "../../services/formatTime";
import classNames from "./message.scss";
import { useDispatch } from "react-redux";
import { setMessageRead } from "../../store/actions";

type Props = {
    text: string,
    username: string,
    timestamp: Date,
    ownMessage: boolean,
    id: string
}



export default (props: Props) => {
    const elemRef = useRef();
    const observer = React.useRef(null);
    const dispatch = useDispatch()
    const onMessageRead = useCallback(
        () => dispatch(setMessageRead(props.id)),
        [dispatch]
    )

    React.useEffect(() => {
        console.log('creating observer for', props.text)
        observer.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    onMessageRead();
                    (observer.current as IntersectionObserver).unobserve(elemRef.current);
                }
            },
            {
                threshold: 0.5
            }

        );
    }, []);

    React.useEffect(() => {
        if (elemRef) {
            // Our ref has a value, pointing to an HTML element
            // The perfect time to observe it.
            console.log('we have ref to obseve', props.text)
            // @ts-ignore
            observer.current.observe(elemRef.current)
        }

        return () => {
            if (elemRef) {
                console.log('cleanup code for', props.text)
                // We need to clean up after this ref
                // The perfect time to unobserve it.

            }
        };
    }, [elemRef]);


    return <div ref={elemRef} className="row">
        <div className={`col-sm-6 ${props.ownMessage ? 'col-sm-offset-6 ' + classNames.ownMessage : ''}`}>
            <p className={classNames.messageDetails}>
                <span>{props.username}, </span>
                <span>{formatTime(props.timestamp)}</span>
            </p>
            <div className={classNames.messageContainer}>
                <span> {props.text} </span>
            </div>
        </div>
    </div>
}