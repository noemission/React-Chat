import React from "react";
import generateID from "../../services/generateID";
import styles from './DropDown.scss'

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
    return <div className={`row ${styles.container}`}>
        <label className={`col-sm-12 ${styles.label}`} htmlFor={id}> {label} </label>
        <select className="col-sm-3" id={id} onChange={handleSelect} value={selectedValue}>
            {options.map(({ value, text }) => {
                return <option key={value} value={value}>{text}</option>
            })}
        </select>
    </div>
}