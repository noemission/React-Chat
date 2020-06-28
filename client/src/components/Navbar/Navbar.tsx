import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from './navbar.scss'

export default () => {
    return <nav className="row">
        <div className={classNames.container}>
            <NavLink className={classNames.link} activeClassName="selected" exact  to="/">Chat</NavLink>
            <NavLink className={classNames.link} activeClassName="selected" to="/about">Settings</NavLink>
        </div>
    </nav>
}