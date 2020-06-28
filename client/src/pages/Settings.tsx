import React, { useState, useCallback } from "react";
import RadioInputGroup from "../components/RadioInputGroup/RadioInputGroup";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Colors, Languages } from "../store/models";
import { setColor, setHour12, setSendWithCtrlEnter, setSelectedLanguage, setUserName } from "../store/actions/settingsActions";
import DropDown from "../components/DropDown/DropDown";
import UsernameSelector from "../components/UsernameSelector/UsernameSelector";

export default () => {

    const dispatch = useDispatch()
    const selectedColor = useSelector((state: RootState) => state.settings.color)
    const availableColors = useSelector((state: RootState) => state.settings.availableColors).map(color => ({
        text: color,
        value: color
    }))
    const onColorSelect = useCallback(
        (color: typeof Colors[number]) => dispatch(setColor(color)),
        [dispatch]
    )


    const selectedClockDisplay = useSelector((state: RootState) => state.settings.hour12)
    const availableClockDisplays = [
        { text: '12 Hour', value: true },
        { text: '24 Hour', value: false },
    ]
    const onClockDisplaySelect = useCallback(
        (hour12: boolean) => dispatch(setHour12((hour12))),
        [dispatch]
    )

    const selectedSendWithCtrlEnter = useSelector((state: RootState) => state.settings.sendWithCtrlEnter)
    const availableSendWithCtrlEnter = [
        { text: 'On', value: true },
        { text: 'Off', value: false },
    ]
    const onSendWithCtrlEnterSelect = useCallback(
        (sendWithCtrlEnter: boolean) => dispatch(setSendWithCtrlEnter((sendWithCtrlEnter))),
        [dispatch]
    )

    const selectedLanguage = useSelector((state: RootState) => state.settings.selectedLanguage)
    const availableLanguages = useSelector((state: RootState) => state.settings.languages).map(lang => ({
        text: lang,
        value: lang
    }))
    const onLanguageSelect = useCallback(
        (language: typeof Languages[number]) => dispatch(setSelectedLanguage((language))),
        [dispatch]
    )

   
    return <div>
        Settings page

        <UsernameSelector/>
        <RadioInputGroup options={availableColors} onSelect={onColorSelect} checkedValue={selectedColor} />
        <RadioInputGroup options={availableClockDisplays} onSelect={onClockDisplaySelect} checkedValue={selectedClockDisplay} />
        <RadioInputGroup options={availableSendWithCtrlEnter} onSelect={onSendWithCtrlEnterSelect} checkedValue={selectedSendWithCtrlEnter} />

        <DropDown options={availableLanguages} selectedValue={selectedLanguage} label="kati" onSelect={onLanguageSelect} />
    </div>
}