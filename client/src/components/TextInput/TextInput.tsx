import React, { useState } from "react";
import classNames from './textInput.scss'
import emojiReplacer from "../../services/emojiReplacer";

type Props = {
    onSubmit: (value: string) => any
    defaultValue?: string
    eraseValueAfterSubmit?: boolean
}

export default (props: Props) => {
    const { onSubmit, defaultValue = "", eraseValueAfterSubmit = false } = props
    const [text, setText] = useState(defaultValue)

    const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setText(emojiReplacer(event.currentTarget.value));

    const handleSubmit = () => {
        onSubmit(text)
        eraseValueAfterSubmit && setText('')
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            handleSubmit()
        }
    }

    return (
        <div className={`row ${classNames.container}`}>
            <div className={`row`}>
                <textarea onKeyDown={onEnterPress} onChange={onInputChange} value={text} className={`col ${classNames.textInput}`} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}