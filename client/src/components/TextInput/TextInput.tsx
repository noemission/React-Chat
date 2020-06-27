import React, { useState } from "react";

type Props = {
    onSubmit: (value: string) => any
}

export default (props: Props) => {
    const [text, setText] = useState('')

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.currentTarget.value);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(props.onSubmit(text))
        setText('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onInputChange} value={text} type="text" />
                <button >Submit</button>
            </form>
        </div>
    );
}