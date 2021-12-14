import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Icon,
  MenuItem,
  Avatar,
  Hidden
} from '@mui/material'

import { MatxMenu } from 'app/components'
// import { loginWithEmail } from 'app/http/auth'
import { logout } from 'app/redux-toolkit/slices/authSlice'
import { loadCart } from 'app/redux-toolkit/slices/userSlice'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
      margin: '0 8px',
      // color: palette.text.secondary
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
  },
}))

const AuthenticatedUserActions = ({ user }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <MatxMenu
      menuButton={
        <div className={classes.userMenu}>
          <Hidden xsDown>
            <span>
              Hi <strong>{user.username}</strong>
            </span>
          </Hidden>
          <Avatar
            className='cursor-pointer'
            src={user.avatar}
          />
        </div>
      }
    >
      <MenuItem>
        <Link className={classes.menuItem} to='/'>
          <Icon> home </Icon>
          <span className='pl-4'> Home </span>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          className={classes.menuItem}
          to='/page-layouts/user-profile'
        >
          <Icon> person </Icon>
          <span className='pl-4'> Profile </span>
        </Link>
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <Icon> settings </Icon>
        <span className='pl-4'> Settings </span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          console.log('logout')
          window.location = '/'
          dispatch(logout())
          dispatch(loadCart())
        }}
        className={classes.menuItem}
      >
        <Icon> power_settings_new </Icon>
        <span className='pl-4'> Logout </span>
      </MenuItem>
    </MatxMenu>
  )
}

export default AuthenticatedUserActions