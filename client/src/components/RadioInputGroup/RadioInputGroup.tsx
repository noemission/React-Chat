import React from "react";
import string2bool from "../../services/string2bool";
import generateID from "../../services/generateID";

type Props = {
    options: {
        value: any,
        text: string
    }[],
    checkedValue: any,
    onSelect: (value: any) => any
}

export default (props: Props) => {

    const { checkedValue, onSelect, options } = props

    const onRadioSelect = (ev: React.SyntheticEvent<HTMLInputElement>) => {
        if (options.every(option => typeof option.value === 'boolean')) {
            onSelect(string2bool(ev.currentTarget.value))
        } else {
            onSelect(ev.currentTarget.value)
        }
    }

    return <div>
        {options.map(({ value, text }) => {
            const id = generateID();
            return <div key={value}>
                <input type="radio" id={id} value={value} checked={value === checkedValue} onChange={onRadioSelect} />
                <label htmlFor={id}>{text}</label>
            </div>

        })}
    </div>
}