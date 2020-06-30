import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/models";
import { setUserName } from "../../store/actions/settingsActions";
import isUsernameTaken from "../../services/isUsernameTaken";
import styles from "./UsernameSelector.scss";
import Button from "../Button/Button";

export default () => {
    const dispatch = useDispatch()

    const username = useSelector((state: RootState) => state.settings.username)
    const onUsernameSelect = useCallback(
        (username: string) => dispatch(setUserName((username))),
        [dispatch]
    );

    const [text, setText] = useState(username)
    const [showWarning, setShowWarning] = useState(false)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    }

    const handleSubmit = (event?: React.FormEvent) => {
        event && event.preventDefault()
        if (username === text) return;
        isUsernameTaken(text)
            .then(isAvailable => {
                if (isAvailable) {
                    onUsernameSelect(text)
                    setShowWarning(false);
                } else {
                    setShowWarning(true);
                }
            })


    }

    useEffect(() => {
        setText(username)
    }, [username]);

    return (
        <form className={`row ${styles.container}`} onSubmit={handleSubmit}>
            <label className={`col-sm-12 ${styles.label}`} htmlFor="">User name</label>
            <div className="row no-wrap">
                <input className="col-sm-12 col-md-6" onChange={onInputChange} value={text} type="text" />
                <Button onClick={handleSubmit}>OK</Button>
            </div>
            {showWarning && <span>Sorry this username is already taken</span>}
        </form>
    );
}