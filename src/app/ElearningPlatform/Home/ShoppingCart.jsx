import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
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

function ShoppingCart() {
	const [totalCost, setTotalCost] = useState(0)
	const [panelOpen, setPanelOpen] = useState(false)
	const userReducer = useSelector(state => state.user)
	const { mutate, isLoading } = useMutation(updateCartRequest, {
		mutationKey: 'updateCart',
	})

	const dispatch = useDispatch()
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

	const handleRemoveCourse = (courseId) => {
		dispatch(removeFromCart({ id: courseId }))
		mutate({ courseId, updateType: 'remove' })
	}

	return (
		<Box>
			<Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, marginTop: 5, paddingTop: 30 }}>
				<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>Shopping Cart</Typography>
			</Grid >
			<AppLayout>
				<Grid container spacing={2}>
					<Grid xs={8}>
						<Typography variant='h5' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 30 }}>4 Courses in Cart</Typography>
						<Grid container spacing={2} style={{ border: '1px solid lightgray', backgroundColor: 'white', marginTop: 5 }}>

							<Card xs={12} sx={{ p: 2, borderRadius: 2, width: '100%' }}>
								<CardContent>
									<Box className='overflow-auto'>
										<div className='min-w-600'>
											{
												userReducer.isLoading ? <MatxLoading /> : userReducer.cart.map((course) => (
													<Link to={`/courses/${course.slug}`} key={course._id}>
														<div className='py-4'>
															<Grid container>
																<Grid lg={8} md={8} sm={8} xs={8}>
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
																					{course.item}
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
																<Grid lg={2} md={2} sm={2} xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
																	<Button variant='text' style={{ display: 'flex', fontSize: 12, textTransform: 'capitalize' }} onClick={handleRemoveCourse.bind(this, course._id)}>Remove</Button>
																	<Button variant='text' style={{ display: 'flex', fontSize: 12, textTransform: 'capitalize' }}>Save for Later</Button>
																	<Button variant='text' style={{ display: 'flex', fontSize: 12, textTransform: 'capitalize' }}>Move to Wishlist</Button>
																</Grid>
																<Grid lg={2} md={2} sm={2} xs={2}>
																	<Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', marginLeft: 5, fontSize: 18 }}>${course.price}</Box>
																	<Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', textDecoration: 'line-through', alignItems: 'center', marginLeft: 5 }}>${course.oldprice}</Box>
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
					</Grid>
					<Grid xs={4}>
						<Grid container style={{ border: '1px solid lightgray', marginLeft: 15, marginTop: 66 }}>
							<Grid xs={12} sx={{ p: 4 }} spacing={4}>
								<Box sx={{ mt: 2 }} />
								<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center' }}>Total</Typography>
								<Typography variant='h4' sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>$9</Typography>
								<Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'line-through' }}>$12</Typography>
								<Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>88% off</Typography>
								<Box sx={{ mt: 2 }} />
								<Button variant='contained' style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', display: 'block' }} onClick={handleCheckoutClick}>Checkout</Button>
								<Box sx={{ mt: 2 }} />
								<Typography variant='h6' style={{ fontWeight: 'bold', flexDirection: 'row' }}>Promotions</Typography>
								<Box sx={{ display: 'flex', flexDirection: 'row' }}>
									<Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
										<IconButton>
											<Icon fontSize='small'>clear</Icon>
										</IconButton>
										CYBER21
									</Typography>
									<Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>&nbsp;is applied</Typography>
								</Box>
								<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
									<TextField
										sx={{ flex: 1, mr: 2 }}
										variant='outlined'
										placeholder='Code'
										size='small'
									/>
									<Button variant='contained' style={{ textAlign: 'center', fontWeight: 'bold' }}>Apply</Button>
								</Box>
							</Grid>
						</Grid >
					</Grid>
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
