import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from './navbar.scss'
import { useSelector } from 'react-redux'
import { getUnreadMessages } from '../../store/selectors/unreadMessages'
import Text from '../Text/Text'
import translate from '../../services/translate'
import { RootState } from '../../store/models'

const defaultTitle = document.title;

export default () => {
    const unreadMessages = useSelector(getUnreadMessages);
    const onlineCount = useSelector((state: RootState) => state.chat.onlineCount);
    const isConnected = useSelector((state: RootState) => state.websocket.connected);
    
    const [unread, setUnread] = useState(0)
    useEffect(() => {
        // without a timeout here the unread counter will keep flashing on every message
        // since we rely on an intersection observer the read event will come at a later point
        // that's why any timeout will solve the issue
        const timer = setTimeout(() => setUnread(unreadMessages.length), 100);
        return () => clearTimeout(timer);
    }, [unreadMessages]);
    useEffect(() => {
        let turn = 0
        const changeTitle = setInterval(() => {
            if (unread === 0) {
                document.title !== defaultTitle && (document.title = defaultTitle)
                return;
            }
            if (turn === 0) {
                document.title = `(${unread}) ${translate('You have unread messages')}`
                turn = 1
            } else {
                document.title = defaultTitle
                turn = 0;
            }
        }, 1000)
        return () => {
            clearInterval(changeTitle);
        }
    }, [unread]);

    return <nav className="row">
        <div className={classNames.container}>
            <NavLink className={classNames.link} activeClassName="selected" exact to="/">
                <Text>Chat</Text>
                {unread ? <span className={classNames.unreadCount}>{unread}</span> : null}
            </NavLink>
            <NavLink className={classNames.link} activeClassName="selected" to="/settings">
                <Text>Settings</Text>
            </NavLink>
            { isConnected && <span className={classNames.onlineCount}><Text>Users</Text>: {onlineCount}</span> }
            { !isConnected && <span className={classNames.notConnected}><Text>Not connected</Text></span> }
        </div>
    </nav>
}