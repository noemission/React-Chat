import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return <nav>
        <ul>
            <li>
                <Link to="/">Chat</Link>
            </li>
            <li>
                <Link to="/about">Settings</Link>
            </li>
        </ul>
    </nav>
}