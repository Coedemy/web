import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Icon,
  IconButton,
  useMediaQuery
} from '@mui/material'
import clsx from 'clsx'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'

import { MatxMenu, MatxSearchBox, MatxLogo } from 'app/components'
import NotificationBar2 from 'app/components/NotificationBar2/NotificationBar2'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { NotificationProvider } from 'app/contexts/NotificationContext'

import AuthenticatedUserActions from './AuthenticatedUserActions'
import UnauthenticatedUserActions from './UnauthenticatedUserActions'
import NotificationBar from '../../NotificationBar/NotificationBar'
import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import Wishlist from '../../Wishlist/Wishlist'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbar: {
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

    '& .topbar-hold': {
      backgroundColor: palette.primary.main,
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    '& .fixed': {
      boxShadow: theme.shadows[8],
      height: 64,
    },
  },
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

const Layout1Topbar = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { settings, updateSettings } = useSettings()
  const { user } = useAuth()
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
  const fixed = settings?.layout1Settings?.topbar?.fixed
  const leftSidebar = settings.layout1Settings.leftSidebar
  const { mode } = leftSidebar
  const { mode: topbarMode } = leftSidebar
  const authReducer = useSelector(state => state.auth)

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    })
  }

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings
    let mode

    if (isMdScreen) {
      mode =
        layout1Settings.leftSidebar.mode === 'close'
          ? 'mobile'
          : 'close'
    } else {
      mode =
        layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
    }

    updateSidebarMode({ mode })
  }

  return (
    <div className={classes.topbar}>
      <div className={clsx({ 'topbar-hold': true, fixed: fixed })} style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='flex justify-between items-center h-full' style={{ width: '80%' }}>
          <div className='flex'>
            <div className='hide-on-mobile'>
              <Link to='/' className='flex items-center'>
                <MatxLogo />
                <span
                  className={clsx({
                    'text-18 ml-2 font-medium sidenavHoverShow': true,
                    [classes.hideOnCompact]: topbarMode === 'compact',
                  })}
                >
                  Matx
                </span>
              </Link>

              <IconButton
                onClick={handleSidebarToggle}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </div>
          <div className='flex items-center'>
            <MatxSearchBox />
            {/* <NotificationProvider>
							<NotificationBar />
						</NotificationProvider> */}
            {/* <NotificationBar2 /> */}
            <div className='hide-on-mobile'>
              <IconButton>
                <PersonIcon />
              </IconButton>
            </div>

            {authReducer.accessToken ? <Wishlist /> : <></>}

            <ShoppingCart />

            {/* show username, wishlist and mylearning with authenticated users */}
            {authReducer.accessToken ? <AuthenticatedUserActions user={authReducer.user} /> : <UnauthenticatedUserActions />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Layout1Topbar)
