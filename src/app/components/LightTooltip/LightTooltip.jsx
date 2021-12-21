import React from 'react'
import { Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { tooltipClasses } from '@mui/material/Tooltip'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[3],
  },
}))

export default LightTooltip