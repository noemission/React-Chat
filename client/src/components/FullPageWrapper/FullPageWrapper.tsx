/* 
    A stylish wrapper component that 
    will take full height for its children
*/
import React from "react";
import styles from './FullPageWrapper.scss'

export default (props: React.PropsWithChildren<{}>) => {
    return <div className={styles.container}> {props.children} </div>
}