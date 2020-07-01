import { createSelector } from 'reselect'
import { RootState } from '../models'

export const getUsername = createSelector(
    (state: RootState) => state.settings.username,
    username => username
)