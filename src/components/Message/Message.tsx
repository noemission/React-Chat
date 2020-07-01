/* 
    A message component designed
    for messages that will render all types of messages
*/
import React, { useRef, useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import formatTime from "../../services/formatTime";
import classNames from "./message.scss";
import { useDispatch, useSelector } from "react-redux";
import { setMessageRead } from "../../store/actions";
import linkParser, { LinkMatch, linkRegex } from "../../services/linkParser";
import MediaMessage from "../MediaMessage/MediaMessage";
import { RootState } from "../../store/models";

type Props = {
    text: string,
    username: string,
    timestamp: Date,
    ownMessage: boolean,
    id: string
}

export default (props: Props) => {
    const elemRef = useRef();
    const observer = useRef(null);
    const dispatch = useDispatch()

    const [links, setLinks]: [LinkMatch[], Dispatch<SetStateAction<LinkMatch[]>>] = useState([])
    const { text } = props
    const hour12 = useSelector((state: RootState) => state.settings.hour12)
    const parseLink = async (text: string) => setLinks(await linkParser(text))
    const linksWithMedia = links.filter(link => link.isImage || link.youtubeID);

    const onMessageRead = useCallback(
        () => dispatch(setMessageRead(props.id)),
        [dispatch]
    );

    useEffect(() => {
        observer.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    onMessageRead();
                    (observer.current as IntersectionObserver).unobserve(elemRef.current);
                }
            },
            { threshold: 0.5 }
        );
    }, []);

    useEffect(() => {
        if (elemRef) {
            // Initial code for observing the element
            (observer.current as IntersectionObserver).observe(elemRef.current)
        }

        return () => {
            if (elemRef) {
                // clean up code for the observer
                (observer.current as IntersectionObserver).unobserve(elemRef.current);
            }
        };
    }, [elemRef]);

    useEffect(() => {
        parseLink(props.text)
    }, [props.text])

    const substituteLinks = () => {
        /* 
            A function that will replace all links in the
            text with correct <a> tags
            In case a link is a youtube video or an image 
            it will leave it blank
        */

        let newText = text.split(linkRegex)
            .reduce((prev, current, i) => {
                if (!i) {
                    return [current];
                }
                const link = links.find(l => l.link === current)
                if (link) {
                    if (!link.isImage && !link.youtubeID)
                        return prev.concat(<a key={i} target="_blank" href={link.link} >{link.link}</a>);
                    else
                        return prev;
                }
                return prev.concat(current)

            }, [])
        return <span>{newText}</span>
    }



    return <div ref={elemRef} className="row">
        <div className={`col-sm-6 ${props.ownMessage ? 'col-sm-offset-6 ' + classNames.ownMessage : ''}`}>
            <p className={classNames.messageDetails}>
                {!props.ownMessage && <span>{props.username}, </span>}
                <span>{formatTime(props.timestamp, hour12)}</span>
            </p>
            <div className={classNames.messageContainer}>
                <div className={linksWithMedia.length ? classNames.hasMedia : ''}>
                    {substituteLinks()}
                </div>
                {linksWithMedia.map((link, i) => <MediaMessage key={link.link + i} link={link} />)}

            </div>
        </div>
    </div>
}