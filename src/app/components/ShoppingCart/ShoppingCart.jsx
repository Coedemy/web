import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Badge, IconButton, Drawer, Button, Box, Typography, Divider } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import clsx from 'clsx'

import useSettings from 'app/hooks/useSettings'
import { orange } from 'app/utils/color'
import { removeFromCart } from 'app/redux-toolkit/slices/userSlice'
import { updateCartRequest } from 'app/http/user'

const CourseTitle = styled.strong`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left
`

const useStyles = makeStyles(({ palette, ...theme }) => ({
  miniCart: {
    width: 'var(--sidenav-width)',
    '& .cart__topbar': {
      height: 'var(--topbar-height)',
    },
    '& .mini-cart__item': {
      transition: 'background 300ms ease',
      '&:hover': {
        background: 'rgba(0,0,0,0.01)',
      },
    },
  },
}))

// let cartListLoaded = false

function ShoppingCart({ container }) {
  const [totalCost, setTotalCost] = useState(0)
  const [panelOpen, setPanelOpen] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { cart } = useSelector((state) => state.user)
  const { settings } = useSettings()
  const { mutate, isLoading } = useMutation(updateCartRequest, {
    mutationKey: 'updateCart',
  })

  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen)
  }

  const handleCheckoutClick = () => {
    history.push('/cart')
    setPanelOpen(false)
  }

  const handleRemoveCourse = (courseId) => {
    dispatch(removeFromCart({ id: courseId }))
    mutate({ courseId, updateType: 'remove' })
  }

  useEffect(() => {
    let total = 0

    cart.forEach((course) => {
      total += course.price
    })

    setTotalCost(total)
  }, [cart])

  return (
    <>
      <IconButton onClick={handleDrawerToggle}>
        <Badge color='secondary' badgeContent={cart.length}>
          <Icon>shopping_cart</Icon>
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          container={container}
          variant='temporary'
          anchor={'right'}
          open={panelOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div
            className={clsx('flex-column h-full', classes.miniCart)}
          >
            <div className='cart__topbar elevation-z6 flex items-center p-1 mb-2 pl-4'>
              <Icon color='primary'>shopping_cart</Icon>
              <h5 className='ml-2 my-0 font-medium'>Shopping Cart</h5>
            </div>

            <div className='flex-grow overflow-auto'>
              {cart.map((course) => (
                <Box key={course._id}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Link
                      to={`/courses/${course.slug}`}
                      onClick={handleDrawerToggle}
                      className='mini-cart__item flex items-center py-2 px-2'
                    >
                      {/* <div className='flex flex-column mr-1'>
                    <IconButton
                      size='small'
                      onClick={() =>
                        dispatch(
                          updateCartAmount(
                            user.id,
                            product.id,
                            product.amount + 1
                          )
                        )
                      }
                    >
                      <Icon className='cursor-pointer'>
                        keyboard_arrow_up
                      </Icon>
                    </IconButton>
                    <IconButton
                      disabled={!(product.amount - 1)}
                      size='small'
                      onClick={() =>
                        dispatch(
                          updateCartAmount(
                            user.id,
                            product.id,
                            product.amount - 1
                          )
                        )
                      }
                    >
                      <Icon className='cursor-pointer'>
                        keyboard_arrow_down
                      </Icon>
                    </IconButton>
                  </div> */}
                      <div className='mr-2'>
                        <img
                          className='w-60 h-60'
                          src={course.courseImage}
                          alt={course.title}
                        />
                      </div>
                      <div className='text-center flex-grow flex-column'>
                        <CourseTitle className='m-0 mb-1'>
                          {course.title}
                        </CourseTitle>
                        <Typography className='text-left mb-1'>Tran Phuong Duy</Typography>
                        <h6 className='text-left text-14' style={{ color: orange }}>
                          ${course.price}.99
                        </h6>
                      </div>
                    </Link>
                    <IconButton
                      size='small'
                      onClick={handleRemoveCourse.bind(this, course._id)}
                    >
                      <Icon fontSize='small'>clear</Icon>
                    </IconButton>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </div>

            <Box sx={{ p: 2 }}><h4>Total: ${totalCost}.99</h4></Box>
            <Button
              className='w-full border-radius-0'
              variant='contained'
              color='primary'
              onClick={handleCheckoutClick}
            >
              {/* Checkout (${totalCost.toFixed(2)}) */}
              Go to cart
            </Button>
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  )
}

export default ShoppingCart
