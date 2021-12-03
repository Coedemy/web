import { themeColors } from './themeColors'
import { createTheme } from '@mui/material/styles'
import { forEach, merge } from 'lodash'
import themeOptions from './themeOptions'

function createMatxThemes() {
    let themes = {}

    forEach(themeColors, (value, key) => {
      themes[key] = createTheme(merge({}, themeOptions, value))
    })
    return themes
}
export const themes = createMatxThemes()
