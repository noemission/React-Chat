import { createSelector } from 'reselect'
import { RootState } from '../models'

export const getTheme = createSelector(
    (state: RootState) => state.settings.color,
    theme => theme
)