import React, { useState } from "react";
import classNames from './textInput.scss'
import emojiReplacer from "../../services/emojiReplacer";
import Button from "../Button/Button";
import translate from "../../services/translate";
import { useSelector } from "react-redux";
import { RootState } from "../../store/models";

type Props = {
    onSubmit: (value: string) => any
    defaultValue?: string
    eraseValueAfterSubmit?: boolean,
    sendMessageOnCtrlEnter: boolean
}

export default (props: Props) => {
    const { onSubmit, defaultValue = "", eraseValueAfterSubmit = false, sendMessageOnCtrlEnter } = props
    const [text, setText] = useState(defaultValue)

    const selectedLanguage = useSelector((state: RootState) => state.settings.selectedLanguage);
    const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setText(emojiReplacer(event.currentTarget.value));

    const handleSubmit = () => {
        if (!text) return;
        onSubmit(text)
        eraseValueAfterSubmit && setText('')
    }

    const onCtrlEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (sendMessageOnCtrlEnter && e.keyCode === 13 && e.ctrlKey) {
            e.preventDefault();
            handleSubmit()
        }
    }

    return (
        <div className={`row ${classNames.container}`}>
            <div className={`row`}>
                <textarea 
                    onKeyDown={onCtrlEnterPress} 
                    onChange={onInputChange} 
                    value={text} 
                    placeholder={`${translate("Type a message", selectedLanguage)}...`}
                    className={`col ${classNames.textInput}`} />
                <Button onClick={handleSubmit}>
                    <i className="icon icon-paper-plane-empty">&#xf1d9;</i>
                </Button>
            </div>
        </div>
    );
}