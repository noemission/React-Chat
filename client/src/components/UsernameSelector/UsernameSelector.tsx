import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/models";
import { setUserName } from "../../store/actions/settingsActions";
import isUsernameTaken from "../../services/isUsernameTaken";

type Props = {

}

export default (props: Props) => {
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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
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
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={onInputChange} value={text} type="text" />
                <button >Submit</button>
                {showWarning && <span>Sorry this username is already taken</span>}
            </form>
        </div>
    );
}