import React, { useState } from "react";
import RadioInputGroup from "../components/RadioInputGroup/RadioInputGroup";


const opts = [
    { text: 'light', value: 'light' },
    { text: 'dark', value: 'dark' },
]

const opts2 = [
    { text: 'light', value: 'light' },
    { text: 'dark', value: 'dark' },
]


export default () => {

    const [checkedValue, setCheckedValue] = useState('light');
    const [checkedValue2, setCheckedValue2] = useState('light');

    return <div>
        Settings page

       <RadioInputGroup  options={opts} onSelect={ (value) => setCheckedValue(value) } checkedValue={checkedValue}  />
       <RadioInputGroup  options={opts} onSelect={ (value) => setCheckedValue2(value) } checkedValue={checkedValue2}  />
        <form action="">
            <div>
                <label htmlFor="">User name</label>
                <input type="text" name="" id="" />
            </div>
            <div>
                <label htmlFor="">Interface</label>

            </div>
            <div>
                <label htmlFor="">Clock</label>
                <input type="text" name="" id="" />
            </div>
        </form>
    </div>
}