import React, { useCallback } from "react";
import RadioInputGroup from "../../components/RadioInputGroup/RadioInputGroup";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Colors, Languages } from "../../store/models";
import { setColor, setHour12, setSendWithCtrlEnter, setSelectedLanguage } from "../../store/actions/settingsActions";
import DropDown from "../../components/DropDown/DropDown";
import UsernameSelector from "../../components/UsernameSelector/UsernameSelector";
import FullPageWrapper from "../../components/FullPageWrapper/FullPageWrapper";
import styles from "./Settings.scss";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { resetToDefaults } from "../../store/actions";

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

    const onResetToDefaultsClick = useCallback(
        () => dispatch(resetToDefaults()),
        [dispatch]
    )


    return <FullPageWrapper>
        <div className={styles.container}>
            <div className="row">
                <UsernameSelector />
            </div>
            <RadioInputGroup label="Interface Color" options={availableColors} onSelect={onColorSelect} checkedValue={selectedColor} />
            <RadioInputGroup label="Clock Display" options={availableClockDisplays} onSelect={onClockDisplaySelect} checkedValue={selectedClockDisplay} />
            <RadioInputGroup label="Send Messages on CTRL+ENTER" options={availableSendWithCtrlEnter} onSelect={onSendWithCtrlEnterSelect} checkedValue={selectedSendWithCtrlEnter} />

            <DropDown options={availableLanguages} selectedValue={selectedLanguage} label="Language" onSelect={onLanguageSelect} />
        </div>
        <Button className={styles.button} onClick={onResetToDefaultsClick}>
            <Text>Reset to defaults</Text>
        </Button>
        
    </FullPageWrapper>
}