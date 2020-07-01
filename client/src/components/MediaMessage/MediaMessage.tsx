/* 
    A message component designed
    for messages that contain images or youtube videos
*/
import React from "react";
import styles from "./mediamessage.scss";
import { LinkMatch } from "../../services/linkParser";

type Props = {
    link: LinkMatch
}

export default (props: Props) => {
    const {link} = props
    
    return  <div className={styles.container}>
        { link.isImage && <img className={styles.image} src={link.link} alt=""/>}
        { link.youtubeID && 
            <iframe className={styles.ytVideo} 
                src={`https://www.youtube.com/embed/${link.youtubeID}`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
            </iframe>}
    </div>
}