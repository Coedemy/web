import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { MatxLogo } from 'app/components'
import useSettings from 'app/hooks/useSettings'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  brand: {
    padding: '20px 18px 20px 29px',
  },
  hideOnCompact: {
    display: 'none',
  },
}))

const Brand = ({ children }) => {
  const classes = useStyles()
  const { settings } = useSettings()
  const leftSidebar = settings.layout1Settings.leftSidebar
  const { mode } = leftSidebar

  return (
    <div
      className={clsx('flex items-center justify-between', classes.brand)}
    >
      <Link to='/' className="flex items-center">
        <MatxLogo />
        <span
          className={clsx({
            'text-18 ml-2 font-medium sidenavHoverShow': true,
            [classes.hideOnCompact]: mode === 'compact',
          })}
        >
          Coedemy
        </span>
      </Link>
      <div
        className={clsx({
          sidenavHoverShow: true,
          [classes.hideOnCompact]: mode === 'compact',
        })}
      >
        {children || null}
      </div>
    </div>
  )
}

export default Brand
