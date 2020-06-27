import React from "react";

type Props = {
    options: {
        value: string,
        text: string
    }[],
    checkedValue: string,
    onSelect: (value: string) => any
}

export default (props: Props) => {

    const {  checkedValue, onSelect, options } = props

    const onRadioSelect = (ev: React.SyntheticEvent<HTMLInputElement>) => onSelect(ev.currentTarget.value)

    return <form>
        {options.map(({ value, text }) => {
            const id = '' + Math.random();
            return <div key={value}>
                <input type="radio" id={id}  value={value} checked={value === checkedValue} onChange={onRadioSelect} />
                <label htmlFor={id}>{text}</label>
            </div>

        })}
    </form>
}