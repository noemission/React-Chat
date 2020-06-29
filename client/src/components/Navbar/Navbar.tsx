import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from './navbar.scss'
import { useSelector } from 'react-redux'
import { getUnreadMessages } from '../../store/selectors/unreadMessages'

const defaultTitle = document.title;

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
    useEffect(() => {
        console.log('new interval started')
        
        // notificationSound.play();

        let turn = 0
        const changeTitle = setInterval(() => {
            if(unread === 0) {
                document.title = defaultTitle
                return;
            }
            if(turn === 0){
                document.title = `You have ${unread} unread message`
                turn = 1
            }else{
                document.title = defaultTitle
                turn = 0;
            }
        },1000)
        return () => {
            console.log('removing one interval')
            clearInterval(changeTitle);
        }
    }, [unread]);

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