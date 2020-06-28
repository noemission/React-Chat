import React from "react";
import generateID from "../../services/generateID";

type Props = {
    options: {
        value: any,
        text: string
    }[],
    selectedValue: any,
    onSelect: (value: any) => any,
    label: string
}

export default (props: Props) => {

    const { selectedValue, onSelect, options, label } = props

    const handleSelect = (ev: React.SyntheticEvent<HTMLSelectElement>) => onSelect(ev.currentTarget.value)


    const id = generateID();
    return <div>
        <label htmlFor={id}> {label} </label>
        <select id={id} onChange={handleSelect} value={selectedValue}>
            {options.map(({ value, text }) => {
                return <option key={value} value={value}>{text}</option>
            })}
        </select>
    </div>
}