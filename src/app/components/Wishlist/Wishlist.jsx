import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Badge, IconButton, Drawer, Button } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
	getCartList,
	deleteProductFromCart,
	updateCartAmount,
} from 'app/redux/actions/EcommerceActions'
import useSettings from 'app/hooks/useSettings'
import useAuth from 'app/hooks/useAuth'

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

let cartListLoaded = false

function Wishlist({ container }) {
	const [totalCost, setTotalCost] = useState(0)
	const [panelOpen, setPanelOpen] = useState(false)

	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const { user } = useAuth()
	const { cartList } = useSelector((state) => state.ecommerce)
	const { settings } = useSettings()

	if (!cartListLoaded) {
		if (user) dispatch(getCartList(user.id))
		cartListLoaded = true
	}

	const handleDrawerToggle = () => {
		setPanelOpen(!panelOpen)
	}

	const handleCheckoutClick = () => {
		if (totalCost > 0) {
			history.push('/wishlist')
			setPanelOpen(false)
		}
	}

	useEffect(() => {
		let total = 0

		cartList.forEach((product) => {
			total += product.price * product.amount
		})

		setTotalCost(total)
	}, [cartList])

	return (
		<Fragment>
			<IconButton onClick={handleDrawerToggle}>
				{/* <Badge color='secondary' badgeContent={cartList.length}> */}
				<Badge color='secondary'>
					<Icon>favorite</Icon>
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
							<Icon color='primary'>favorite</Icon>
							<h5 className='ml-2 my-0 font-medium'>Wishlist</h5>
						</div>

						<div className='flex-grow overflow-auto'>
							{cartList.map((product) => (
								<div
									key={product.id}
									className='mini-cart__item flex items-center py-2 px-2'
								>
									<div className='flex flex-column mr-1'>
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
									</div>
									<div className='mr-2'>
										<img
											className='w-48'
											src={product.imgUrl}
											alt={product.title}
										/>
									</div>
									<div className='mr-2 text-center flex-grow flex-column'>
										<h6 className='m-0 mb-1 ellipsis w-120'>
											{product.title}
										</h6>
										<small className='text-muted'>
											${product.price} x {product.amount}
										</small>
									</div>
									<IconButton
										size='small'
										onClick={() =>
											dispatch(
												deleteProductFromCart(
													user.userId,
													product.id
												)
											)
										}
									>
										<Icon fontSize='small'>clear</Icon>
									</IconButton>
								</div>
							))}
						</div>

						<Button
							className='w-full border-radius-0'
							variant='contained'
							color='primary'
							onClick={handleCheckoutClick}
						>
							{/* Checkout (${totalCost.toFixed(2)}) */}
							Go to wishlist
						</Button>
					</div>
				</Drawer>
			</ThemeProvider>
		</Fragment>
	)
}

export default Wishlist
