import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Box, Checkbox, Divider, Rating, Button, TextField, Grid, RadioGroup, MenuItem, Typography, FormControl, Select } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import styled from 'styled-components'

import { orange } from 'app/utils/color'
import { formatToVND } from 'app/utils/formatter'
import { checkoutRequest } from 'app/http/course'
import { checkoutSuccess } from 'app/redux-toolkit/slices/userSlice'

import AppLayout from '../Layout/AppLayout'
import { LoadingButton } from 'app/components'



const RatingNumber = styled.strong`
  font-size: 14px;
  color: ${orange};
  margin-right: 8px;
`

const nations = [
	{ id: 0, title: 'ThaiLand' },
	{ id: 1, title: 'Campuchia' },
	{ id: 2, title: 'Dong Lao' },
	{ id: 3, title: 'China' }]

const OrderItem = ({ course }) => {

	return (
		<div key={course._id} className='py-4'>
			<Grid container alignItems='center'>
				<Grid item lg={10} md={10} sm={10} xs={10}>
					<div className='flex'>
						<img
							className='border-radius-4 w-100 mr-3'
							src={course.courseImage}
							alt={course.title}
						/>
						<div className='flex-grow'>
							<h6 className='mt-0 mb-3 text-15 text-primary'>
								{course.title}
							</h6>
							<p className='mt-0 mb-6px text-13'>
								<span className='text-muted'>
									{' '}
								</span>
								<span className='font-medium'>
									TRAN PHUONG DUY
								</span>
							</p>
							<p className='mt-0 mb-6px text-13'>
								<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
									<RatingNumber>{4}</RatingNumber>
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
							</p>
							<p className='mt-0 mb-6px text-13'>
								<span className='text-muted'>
									{' '}
								</span>
								<span className='font-medium'>
									{course.category.title}
								</span>
							</p>
						</div>
					</div>
				</Grid>


				<Grid
					item
					lg={2}
					md={2}
					sm={2}
					xs={2}
					className='text-center'
				>
					<div className='flex justify-end items-center' style={{ display: 'block' }}>
						<Box sx={{ display: 'block', flexDirection: 'row' }}>
							<Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', marginLeft: 5 }}>${course.price}</Box>
							<Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', textDecoration: 'line-through', alignItems: 'center', marginLeft: 5 }}>${course.price}</Box>
						</Box>
					</div>
				</Grid>
			</Grid>
		</div >
	)
}

const Checkout = () => {
	const [curCategory, setCurCategory] = useState('')
	const [totalCost, setTotalCost] = useState(0)
	const [checking, setChecking] = useState(false)
	const userReducer = useSelector(state => state.user)
	const history = useHistory()
	const dispatch = useDispatch()

	const [nameOnCard, setNameOnCard] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [cardNumber, setCardNumber] = useState('')

	const { mutate, isLoading } = useMutation(checkoutRequest, {
		mutationKey: 'checkout'
	})

	const onCheckoutSuccessfully = async (data) => {
		dispatch(checkoutSuccess(data))

		history.push('/my-courses/learning')
	}


	useEffect(() => {

		//redirect if there is no item in cart
		if (!userReducer.isLoading) {
			if (userReducer.cart.length === 0) history.push('/cart')
		}
	}, [userReducer.isLoading])

	useEffect(() => {
		if (userReducer.cart.length > 0) {
			setTotalCost(calculateTotalCost(userReducer.cart))
		}
		else setTotalCost(0)
	}, [userReducer.cart.length])

	const onCheckout = (e) => {
		if (userReducer.cart.length !== 0) {
			setChecking(true)
			setTimeout(() => {
				mutate({ cart: userReducer.cart }, {
					onSuccess: onCheckoutSuccessfully
				})
				setChecking(false)
			}, 2000)
		}
	}

	const handleChange = (event) => {
		setCurCategory(event.target.value)
	}
	const handleChangeTick = (event) => {
		event.persist()
		setState({
			...state,
			[event.target.name]: event.target.value,
		})
	}

	const calculateTotalCost = (courses) => {
		if (!courses || courses.length === 0) return 0
		if (courses.length === 1) return courses[0].price
		const totalCost = courses.reduce((a, b) => a.price + b.price)
		return totalCost
	}

	const [state, setState] = useState({
		date: new Date(),
	})
	const {
		username,
		firstName,
		creditCard,
		mobile,
		password,
		confirmPassword,
		gender,
		date,
		email,
	} = state

	return (
		<Box>
			<Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, paddingTop: 30 }}>
				<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>Checkout</Typography>
			</Grid >
			<AppLayout>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Typography variant='h6' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 20 }}>Billing Address</Typography>
						<Box>
							{/* <FormControl sx={{ minWidth: 220, mt: 1, nb: 1 }}>
								<Select
									value={curCategory}
									onChange={handleChange}
									displayEmpty
									size='small'
									inputProps={{ 'aria-label': 'Without label' }}
								>
									<MenuItem value=''>
										Viet Nam
									</MenuItem>
									{nations.map(c => <MenuItem key={c.id} sx={{ backgroundColor: 'white' }} value={c.id}>{c.title}</MenuItem>)}
								</Select>
							</FormControl> */}
						</Box>
						<Box container spacing={2} style={{ border: '1px solid lightgray', backgroundColor: 'white', padding: 32, marginTop: 10 }}>
							{/* <RadioGroup className='mb-12' value={gender || ''} name='gender' onChange={handleChangeTick} row>
								<FormControlLabel
									value='New Payment Cart'
									control={<Radio color='secondary' />}
									label='New Payment Cart'
									labelPlacement='end'
								/>
								<FormControlLabel
									value='Paypal'
									control={<Radio color='secondary' />}
									label='Paypal'
									labelPlacement='end'
								/>
							</RadioGroup> */}
							<Box>
								<Grid container spacing={6}>
									<Grid item lg={6} md={6} sm={12} xs={12}>
										<TextField
											size='small'
											className='mb-4 w-full'
											label='Name on Card'
											onChange={(e) => {
												setNameOnCard(e.target.value)
											}}
											spellCheck={false}
											type='text'
											name='Name on Card'
											value={nameOnCard}
										// validators={[
										// 	'required',
										// 'minStringLength: 4',
										// 'maxStringLength: 9',
										// ]}
										// errorMessages={['this field is required']}
										/>
										<TextField
											size='small'
											className='mb-4 w-full'
											label='Credit Card Number'
											onChange={(e) => {
												setCardNumber(e.target.value)
											}}
											spellCheck={false}
											type='text'
											name='Card Number'
											value={cardNumber}
										// validators={['required']}
										// errorMessages={['this field is required']}
										/>

									</Grid>
									<Grid item lg={6} md={6} sm={12} xs={12}>
										<TextField
											size='small'
											className='mb-4 w-full'
											label='Zip/Postal Code'
											onChange={(e) => {
												setPostalCode(e.target.value)
											}}
											spellCheck={false}
											name='text'
											type='Zip/Postal Code'
											value={postalCode}
										// validators={['required']}
										// errorMessages={['this field is required']}
										/>
										<TextField
											size='small'
											className='mb-4 w-full'
											label='MM/YY'
											type='text'
											name='MM/YY'
											disabled
											spellCheck={false}
											value={(new Date()).toLocaleDateString()}
										// validators={['required', 'isEmail']}
										// errorMessages={[
										// 	'this field is required',
										// ]}
										/>
									</Grid>
								</Grid>
								{/* <FormControlLabel control={<Checkbox />} label='Remember this card' /> */}
							</Box>
						</Box>
						<Typography variant='h6' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 20 }}>Order Detail</Typography>
						<Box container spacing={2} style={{ border: '1px solid lightgray', backgroundColor: 'white', padding: 32, marginTop: 10 }}>
							<Grid item xs={12}>
								<div className='overflow-auto'>
									<div className='min-w-600'>
										<div className='py-3'>
											<Grid container>
												<Grid item lg={10} md={10} sm={10} xs={10}>
													<h6 className='m-0 font-medium'>
														Product Details
													</h6>
												</Grid>
												<Grid item lg={2} md={2} sm={2} xs={2} className='text-center'>
													<h6 className='m-0 font-medium'>Price</h6>
												</Grid>
											</Grid>
										</div>
										<Divider />
										{userReducer.cart.length === 0 ? <></> : userReducer.cart.map((course) => <OrderItem key={course._id} course={course} />)}
									</div>
								</div>
							</Grid>
						</Box >
					</Grid>
					<Grid item xs={4}>
						<Box container spacing={0} style={{ border: '1px solid lightgray', marginTop: 60 }}>
							<Box sx={{ m: 3 }}>
								<Box item xs={12}>
									<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Summary</Typography>
									<Grid item xs={12}>
										<div>
											<Grid container>
												<Grid item lg={9} md={9} sm={9} xs={9}>
													<h6 style={{ fontSize: '20px' }}>
														Price:
													</h6>
												</Grid>
												<Grid item lg={3} md={3} sm={3} xs={3}>
													<h6 style={{ fontSize: '20px', position: 'right' }}>${calculateTotalCost(userReducer.cart)}</h6>
												</Grid>
											</Grid>
										</div>
										{/* <div>
											<Grid container>
												<Grid item lg={9} md={9} sm={9} xs={9}>
													<h6 style={{ fontSize: '20px' }}>
														Coupon discounts:
													</h6>
												</Grid>
												<Grid item lg={3} md={3} sm={3} xs={3}>
													<h6 style={{ fontSize: '20px' }}>-$50.00</h6>
												</Grid>
											</Grid>
										</div> */}
									</Grid>
									<Divider />
									<Box sx={{ marginTop: 2 }} />
									<Grid item xs={12}>
										<div>
											<Grid container>
												<Grid item lg={9} md={9} sm={9} xs={9}>
													<h6 style={{ fontSize: '20px' }}>
														Total:
													</h6>
												</Grid>
												<Grid item lg={3} md={3} sm={3} xs={3}>
													<h6 style={{ fontSize: '20px', position: 'right' }}>${calculateTotalCost(userReducer.cart)}</h6>
												</Grid>
											</Grid>
										</div>
									</Grid>
									<Typography sx={{ fontSize: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Coedemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</Typography>
									<Box sx={{ marginBottom: 4 }} />
									{/* <Button variant='contained' style={{ textAlign: 'center', fontWeight: 'bold', display: 'block', width: '100%' }} onClick={onCheckout}>Complete Payment</Button> */}

									<LoadingButton loading={checking} label='Complete Payment' onClick={onCheckout} style={{ width: '100%' }} />
									<Box sx={{ marginBottom: 4 }} />
								</Box>
							</Box>
						</Box >
					</Grid>
				</Grid>
				<Box sx={{ marginBottom: 4 }} />
			</AppLayout>
		</Box>
	)
	// >>>>>>> master
}

export default Checkout
