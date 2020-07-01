import React from "react";
import string2bool from "../../services/string2bool";
import generateID from "../../services/generateID";
import styles from "./RadioInputGroup.scss";
import Text from "../Text/Text";

type Props = {
    options: {
        value: any,
        text: string
    }[],
    checkedValue: any,
    label: string,
    onSelect: (value: any) => any
}

export default (props: Props) => {

    const { checkedValue, onSelect, options, label } = props

    const onRadioSelect = (ev: React.SyntheticEvent<HTMLInputElement>) => {
        if (options.every(option => typeof option.value === 'boolean')) {
            onSelect(string2bool(ev.currentTarget.value))
        } else {
            onSelect(ev.currentTarget.value)
        }
    }

    return <div className={`row ${styles.container}`}>
        <div className="col-sm-12">
            <p><Text>{label}</Text></p>
        </div>
        <div className="row">
            {options.map(({ value, text }) => {
                const id = generateID();
                return <div key={value} className={styles.option}>
                    <input type="radio" id={id} value={value} checked={value === checkedValue} onChange={onRadioSelect} />
                    <label htmlFor={id}> <Text>{text}</Text></label>
                </div>
            })}
        </div>
    </div>
}