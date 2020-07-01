import { createSelector } from 'reselect'
import { RootState } from '../models'
import UsernameSelector from '../../components/UsernameSelector/UsernameSelector'
import { getUsername } from './username'

const getMessages = (state: RootState) => state.chat.messageList

export const getUnreadMessages = createSelector(
    [getMessages, getUsername],
    (messages, username) => messages.filter(message => message.username != username &&  !message.read)
)