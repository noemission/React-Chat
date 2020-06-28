import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from './navbar.scss'
import { useSelector } from 'react-redux'
import { getUnreadMessages } from '../../store/selectors/unreadMessages'

export default () => {
    const unreadMessages = useSelector(getUnreadMessages);
    const [unread, setUnread] = useState(0)
    useEffect(() => {
        // without a timeout here the unread counter will keep flashing on every message
        // since we rely on an intersection observer the read event will come at a later point
        // that's why any timeout will solve the issue
        const timer = setTimeout(() => setUnread(unreadMessages.length), 100);
        return () => clearTimeout(timer);
    }, [unreadMessages]);

    return <nav className="row">
        <div className={classNames.container}>
            <NavLink className={classNames.link} activeClassName="selected" exact to="/">
                Chat
                {unread ? <sup>{unread}</sup> : null}
            </NavLink>
            <NavLink className={classNames.link} activeClassName="selected" to="/settings">Settings</NavLink>
        </div>
    </nav>
}