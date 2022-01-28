import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Button, Divider, Grid, Rating, Typography, IconButton, Icon, TextField, Card, CardContent } from '@mui/material'
import styled from 'styled-components'

import { removeFromCart } from 'app/redux-toolkit/slices/userSlice'
import { orange } from 'app/utils/color'
import { formatToVND } from 'app/utils/formatter'
import { MatxLoading } from 'app/components'
import { updateCartRequest } from 'app/http/user'
import CoursesList from './CoursesList'
import AppLayout from '../Layout/AppLayout'
import courseDataList from '../fakeData/coursesDataList'

const RatingNumber = styled.strong`
  font-size: 14px;
  color: ${orange};
  margin-right: 8px;
`

const CartItemsList = ({ courses, setTotalCost }) => {

	const [total, setTotal] = useState(0)
	const { mutate, isLoading } = useMutation(updateCartRequest, {
		mutationKey: 'updateCart',
	})
	const dispatch = useDispatch()

	const handleRemoveCourse = (courseId) => {
		dispatch(removeFromCart({ id: courseId }))
		mutate({ courseId, updateType: 'remove' })
	}

	const calculateTotalCost = () => {
		if (courses.length < 1) return 0
		if (courses.length === 1) return courses[0].price

		const totalCost = courses.reduce((a, b) => a.price + b.price, 0)
		return totalCost
	}

	useEffect(() => {
		if (courses.length > 0) {
			setTotalCost(calculateTotalCost())
		}
	}, [courses.length])

	return (
		<Grid container spacing={2} style={{ border: '1px solid lightgray', backgroundColor: 'white', marginTop: 5 }}>
			<Card xs={12} sx={{ p: 2, borderRadius: 2, width: '100%' }}>
				<CardContent>
					<Box className='overflow-auto'>
						<div className='min-w-600'>
							{
								courses.map((course) => (
									<Link to={`/courses/${course.slug}`} key={course._id}>
										<div className='py-4'>
											<Grid container>
												<Grid item lg={8} md={8} sm={8} xs={8}>
													<div className='flex'>
														<img
															className='border-radius-4 w-100 mr-3'
															src={course.courseImage}
															alt={course.title}
														/>
														<div className='flex-grow'>
															<h6 className='mt-0 mb-3 text-15'>
																{course.title}
															</h6>
															<p className='mt-0 mb-6px text-13'>
																<span className='text-muted'>
																	{' '}
																</span>
																<span className='font-medium'>
																	{/* {course.item} */}
																	TRAN PHUONG DUY
																</span>
															</p>
															<div className='mt-0 mb-6px text-13'>
																<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
																	<RatingNumber>{course.averageRating}</RatingNumber>
																	<Rating
																		name='text-feedback'
																		value={course.averageRating}
																		readOnly
																		precision={0.5}
																		size='small'
																		emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
																	/>
																	<Box sx={{ ml: 1 }}>({formatToVND(course.reviews.length)})</Box>
																</Box>
															</div>
															<p className='mt-0 mb-6px text-13'>
																<span className='font-medium'>
																	{' '}
																</span>
																<span className='font-medium'>
																	{course.category.title}
																</span>
															</p>
														</div>
													</div>
												</Grid>
												<Grid item lg={2} md={2} sm={2} xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
													<Button variant='text' style={{ display: 'flex', fontSize: 12, textTransform: 'capitalize' }} onClick={handleRemoveCourse.bind(this, course._id)}>Remove</Button>
													<Button variant='text' style={{ display: 'flex', fontSize: 12, textTransform: 'capitalize' }}>Save for Later</Button>
													<Button variant='text' style={{ display: 'flex', fontSize: 12, textTransform: 'capitalize' }}>Move to Wishlist</Button>
												</Grid>
												<Grid item lg={2} md={2} sm={2} xs={2}>
													<Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', marginLeft: 5, fontSize: 18 }}>${course.price}</Box>
													{/* <Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', textDecoration: 'line-through', alignItems: 'center', marginLeft: 5 }}>${course.oldprice}</Box> */}
												</Grid>
											</Grid>

											<Box sx={{ mb: 2 }} />
											< Divider />
										</div>
									</Link>
								))
							}
						</div>
					</Box>
				</CardContent>
			</Card>
		</Grid >
	)
}

const CheckoutCard = ({ total }) => {
	const [canCheckout, setCanCheckout] = useState(false)
	const [panelOpen, setPanelOpen] = useState(false)
	const history = useHistory()
	const handleCheckoutClick = () => {
		// if (totalCost > 0) {
		//     console.log('hello')
		// 	history.push('/cart/checkout')
		// 	setPanelOpen(false)
		// }
		history.push('/cart/checkout')
		setPanelOpen(false)
	}

	const authReducer = useSelector(state => state.auth)

	useEffect(() => {
		if (!authReducer.isLoading && authReducer.accessToken) setCanCheckout(true)
		else setCanCheckout(false)
	}, [authReducer.isLoading])

	return (
		<Grid sx={{ p: 4, width: '100%' }}>
			<Box sx={{ mt: 2 }} />
			<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center' }}>Pricing</Typography>
			<Typography variant='h4' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}><Box sx={{ fontWeight: 'bold', textAlign: 'center', mr: 2 }}>Total: </Box>${total}</Typography>
			{/* <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'line-through' }}>$12</Typography>
			<Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>88% off</Typography> */}
			<Box sx={{ mt: 2 }} />
			<Button disabled={!canCheckout} variant='contained' style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', display: 'block' }} onClick={handleCheckoutClick}>Checkout</Button>
			{
				!canCheckout ? <p className='text-error'>You need to login to checkout!</p> : <></>
			}
			<Box sx={{ mt: 2 }} />
			{/* <Typography variant='h6' style={{ fontWeight: 'bold', flexDirection: 'row' }}>Promotions</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<IconButton>
						<ClearIcon fontSize='small' />
					</IconButton>
					CYBER21
				</Typography>
				<Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>&nbsp;is applied</Typography>
			</Box> */}
			<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
				{/* <TextField
					sx={{ flex: 1, mr: 2 }}
					variant='outlined'
					placeholder='Code'
					size='small'
				/>
				<Button variant='contained' style={{ textAlign: 'center', fontWeight: 'bold' }}>Apply</Button> */}
			</Box>
		</Grid>
	)
}

const NoItemCard = () => {
	return (
		<Grid container spacing={2} style={{ border: '1px solid lightgray', backgroundColor: 'white', marginTop: 5 }}>
			<Card sx={{ p: 2, borderRadius: 2, width: '100%' }}>
				<CardContent>
					<Typography variant='h6' style={{ flexDirection: 'row', marginTop: 30 }}>Your cart is empty. Keep shopping to find a course!</Typography>
					<Box sx={{ mb: 2 }} />
					<Link to='/'><Button variant='contained' color='primary'>Keep Shopping</Button></Link>
				</CardContent>
			</Card>
		</Grid>
	)
}

const ShoppingCart = () => {
	const [totalCost, setTotalCost] = useState(0)
	const userReducer = useSelector(state => state.user)

	// console.log(totalCost)
	return (
		<Box>
			<Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, marginTop: 5, paddingTop: 30 }}>
				<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>Shopping Cart</Typography>
			</Grid >
			<AppLayout>
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<Typography variant='h5' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 30 }}>{userReducer.cart.length} Courses in Cart</Typography>
						{userReducer.cart.length === 0 ? <NoItemCard /> : <CartItemsList courses={userReducer.cart} setTotalCost={setTotalCost} />}
					</Grid>
					{userReducer.cart.length === 0 ? <></> :
						(<Grid item xs={3}>
							<Grid container style={{ border: '1px solid lightgray', marginLeft: 15, marginTop: 66 }}>
								<CheckoutCard total={totalCost} />
							</Grid >
						</Grid>)}
				</Grid>
				<Typography variant='h5' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 20 }}>You might also like</Typography>
				<Box sx={{ marginBottom: 2 }} />
				<CoursesList courses={courseDataList} />
				<Box sx={{ marginBottom: 4 }} />
			</AppLayout>
		</Box>
	)
}

export default ShoppingCart
