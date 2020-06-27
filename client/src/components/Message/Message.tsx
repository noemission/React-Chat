import React from "react";

type Props = {
    text: string
}

export default (props: Props) => {
    return <div>
        <p> {props.text} </p>
    </div>
}