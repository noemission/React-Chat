import React, { CSSProperties } from "react";
import styles from './Text.scss'
import translate from "../../services/translate";
import { useSelector } from "react-redux";
import { RootState } from "../../store/models";


export default (props: React.PropsWithChildren<{}>) => {
    const language = useSelector((state: RootState) => state.settings.selectedLanguage)
    return <>{translate(props.children as any, language)}</>
}