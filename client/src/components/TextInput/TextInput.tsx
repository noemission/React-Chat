import React, { useState } from "react";
import classNames from './textInput.scss'

type Props = {
    onSubmit: (value: string) => any
    defaultValue?: string
    eraseValueAfterSubmit?: boolean
}

export default (props: Props) => {
    const { onSubmit, defaultValue = "", eraseValueAfterSubmit = false } = props
    const [text, setText] = useState(defaultValue)

    const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.currentTarget.value);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onSubmit(text)
        eraseValueAfterSubmit && setText('')
    }

    return (
        <div className={`row ${classNames.container}`}>
            <form onSubmit={handleSubmit} className={`row ${classNames.form}`}>
                <textarea onChange={onInputChange} value={text} className={`col ${classNames.textInput}`}/>
                <button >Submit</button>
            </form>
        </div>
    );
}