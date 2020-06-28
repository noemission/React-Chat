import React from "react";
import formatTime from "../../services/formatTime";
import classNames from "./message.scss";

type Props = {
    text: string,
    username: string,
    timestamp: Date,
    ownMessage: boolean
}

export default (props: Props) => {
    return <div className="row">
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