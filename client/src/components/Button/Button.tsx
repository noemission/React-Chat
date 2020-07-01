/* 
    A generic button component that 
    will wrap its children into an html button element 
*/

import React, { CSSProperties } from "react";
import styles from './Button.scss'

type Props = {
    onClick: () => any,
    style?: CSSProperties,
    className?: string
}

export default (props: React.PropsWithChildren<Props>) => {
    return <button style={props.style} className={styles.btn + ' ' + props.className} onClick={props.onClick}>{props.children}</button>
}