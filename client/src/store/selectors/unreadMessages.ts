import { createSelector } from 'reselect'
import { RootState } from '../models'

const getMessages = (state: RootState) => state.chat.messageList

export const getUnreadMessages = createSelector(
    [getMessages],
    (messages) => messages.filter(message => !message.read)
)