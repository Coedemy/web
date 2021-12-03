import StarIcon from '@mui/icons-material/Star'
import { Box, Button, Divider, Grid, Rating, Typography, IconButton, Icon, TextField } from '@mui/material'
import { orange } from 'app/utils/color'
import { formatToVND } from 'app/utils/formatter'
import React, { Fragment, useState, useEffect }  from 'react'
import styled from 'styled-components'
import AppLayout from '../Layout/AppLayout'
import CoursesList from './CoursesList';
import courseDataList from '../fakeData/coursesDataList'
import { useHistory } from 'react-router-dom'



const dummyProductList = [
	{
		id: '321',
		imgUrl: '/assets/images/products/speaker-1.jpg',
		price: 324.0,
        oldprice: 400.0,
		amount: 10,
		title: 'Bass Speaker Black',
		category: '7 horas en total . 8 lectures . All Levels',
		brand: 'Microlab',
		item: 'By Tran Phuong Duy',
	},
	{
		id: '322',
		imgUrl: '/assets/images/products/speaker-2.jpg',
		price: 454.0,
        oldprice: 550.0,
		amount: 15,
		title: 'Bass Speaker',
		category: '1 horas en total . 114 lectures . All Levels',
		brand: 'Microlab',
		item: 'By Tang Khanh Chuong',
	},
    {
		id: '323',
		imgUrl: '/assets/images/products/speaker-1.jpg',
		price: 324.0,
        oldprice: 600.0,
		amount: 10,
		title: 'Bass Speaker Black',
		category: '12 horas en total . 18 lectures . All Levels',
		brand: 'Microlab',
		item: 'By Tran Phuong Duy',
	},
    {
		id: '324',
		imgUrl: '/assets/images/products/speaker-2.jpg',
		price: 454.0,
        oldprice: 500.0,
		amount: 15,
		title: 'Bass Speaker',
		category: '14 horas en total . 228 lectures . All Levels',
		brand: 'Microlab',
		item: 'By Tang Khanh Chuong',
	},
]


const CourseTitle = styled.strong`
  font-size: 18px;
  overflow: hidden;
  color: ${orange};
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const CourseDescription = styled.strong`
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const CoursePrice = styled.strong`
  font-size: 14px;
  color: ${orange};
`

const RatingNumber = styled.strong`
  font-size: 14px;
  color: ${orange};
  margin-right: 8px;
`


function ShoppingCart({ courses }){
    const [totalCost, setTotalCost] = useState(0)
	const [panelOpen, setPanelOpen] = useState(false)

	const history = useHistory()
    const handleCheckoutClick = () => {
        console.log("hi")
		// if (totalCost > 0) {
        //     console.log("hello")
		// 	history.push('/cart/checkout')
		// 	setPanelOpen(false)
		// }
        history.push('/cart/checkout')
        setPanelOpen(false)
	}
    return (
        <Box>
            <Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, marginTop: 5, paddingTop: 30 }}>
				<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>Shopping Cart</Typography>
			</Grid >
            <AppLayout>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Typography variant='h5' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 20 }}>4 Courses in Cart</Typography>
                        <Grid container spacing={2} style={{border: '1px solid lightgray', backgroundColor: 'white', padding: 32, marginTop: 10 }}>
                            <Grid item xs={12}>
                                <div className="overflow-auto">
                                    <div className="min-w-600">
                                        <div className="py-3">
                                            <Grid container>
                                                <Grid item lg={8} md={8} sm={8} xs={8}>
                                                    <h6 className="m-0 font-medium">
                                                        Product Details
                                                    </h6>
                                                </Grid>                                               
                                                <Grid
                                                    item
                                                    lg={2}
                                                    md={2}
                                                    sm={2}
                                                    xs={2}
                                                    className="text-center"
                                                >
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={2}
                                                    md={2}
                                                    sm={2}
                                                    xs={2}
                                                    className="text-center"
                                                >
                                                    <h6 className="m-0 font-medium">Price</h6>
                                                </Grid>
                                            </Grid>
                                        </div>

                                        <Divider />

                                        {dummyProductList.map((product) => (
                                            <div key={product.id} className="py-4">
                                                <Grid container alignItems="center">
                                                    <Grid item lg={8} md={8} sm={8} xs={8}>
                                                        <div className="flex">
                                                            <img
                                                                className="border-radius-4 w-100 mr-3"
                                                                src={product.imgUrl}
                                                                alt={product.title}
                                                            />
                                                            <div className="flex-grow">
                                                                <h6 className="mt-0 mb-3 text-15 text-primary">
                                                                    {product.title}
                                                                </h6>
                                                                <p className="mt-0 mb-6px text-13">
                                                                    <span className="text-muted">
                                                                        {' '}
                                                                    </span>
                                                                    <span className="font-medium">
                                                                        {product.item}
                                                                    </span>
                                                                </p>
                                                                <p className="mt-0 mb-6px text-13">
                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                        <RatingNumber>{4}</RatingNumber>
                                                                        <Rating
                                                                            name="text-feedback"
                                                                            value={4}
                                                                            readOnly
                                                                            precision={0.5}
                                                                            size='small'
                                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                        />
                                                                        <Box sx={{ ml: 1 }}>({formatToVND(12.263)})</Box>
                                                                    </Box>
                                                                </p>
                                                                <p className="mt-0 mb-6px text-13">
                                                                    <span className="text-muted">
                                                                        {' '}
                                                                    </span>
                                                                    <span className="font-medium">
                                                                        {product.category}
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
                                                        className="text-center"
                                                    >
                                                        <Button variant="text"  style={{  display: 'flex', fontSize: 11, textTransform: 'capitalize', float:'right'}}>Remove</Button>
                                                        <Button variant="text"  style={{  display: 'flex', fontSize: 11, textTransform: 'capitalize', float:'right'}}>Save for Later</Button>
                                                        <Button variant="text"  style={{  display: 'flex', fontSize: 11, textTransform: 'capitalize', float:'right'}}>Move to Wishlist</Button>
                                                    </Grid>
                                                    
                                                    <Grid
                                                        item
                                                        lg={2}
                                                        md={2}
                                                        sm={2}
                                                        xs={2}
                                                        className="text-center"
                                                    >
                                                        <div className="flex justify-end items-center" style={{  display: 'block'}}>
                                                            <Box sx={{ display: 'block', flexDirection: 'row' }}>
                                                                <Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', marginLeft: 5}}>${product.price}</Box>
                                                                <Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', textDecoration: 'line-through', alignItems: 'center', marginLeft: 5}}>${product.oldprice}</Box>
                                                            </Box>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </Grid >
                        <Typography variant='h5' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 20 }}>Recently wishlisted</Typography>
                        <Grid container spacing={2} style={{border: '1px solid lightgray', backgroundColor: 'white', padding: 32, marginTop: 10 }}>
                            <Grid item xs={12}>
                                <div className="overflow-auto">
                                    <div className="min-w-600">
                                        <div className="py-3">
                                            <Grid container>
                                                <Grid item lg={8} md={8} sm={8} xs={8}>
                                                    <h6 className="m-0 font-medium">
                                                        Product Details
                                                    </h6>
                                                </Grid>                                               
                                                <Grid
                                                    item
                                                    lg={2}
                                                    md={2}
                                                    sm={2}
                                                    xs={2}
                                                    className="text-center"
                                                >
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={2}
                                                    md={2}
                                                    sm={2}
                                                    xs={2}
                                                    className="text-center"
                                                >
                                                    <h6 className="m-0 font-medium">Price</h6>
                                                </Grid>
                                            </Grid>
                                        </div>

                                        <Divider />

                                        {dummyProductList.map((product) => (
                                            <div key={product.id} className="py-4">
                                                <Grid container alignItems="center">
                                                    <Grid item lg={8} md={8} sm={8} xs={8}>
                                                        <div className="flex">
                                                            <img
                                                                className="border-radius-4 w-100 mr-3"
                                                                src={product.imgUrl}
                                                                alt={product.title}
                                                            />
                                                            <div className="flex-grow">
                                                                <h6 className="mt-0 mb-3 text-15 text-primary">
                                                                    {product.title}
                                                                </h6>
                                                                <p className="mt-0 mb-6px text-13">
                                                                    <span className="text-muted">
                                                                        {' '}
                                                                    </span>
                                                                    <span className="font-medium">
                                                                        {product.item}
                                                                    </span>
                                                                </p>
                                                                <p className="mt-0 mb-6px text-13">
                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                        <RatingNumber>{4}</RatingNumber>
                                                                        <Rating
                                                                            name="text-feedback"
                                                                            value={4}
                                                                            readOnly
                                                                            precision={0.5}
                                                                            size='small'
                                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                        />
                                                                        <Box sx={{ ml: 1 }}>({formatToVND(12.263)})</Box>
                                                                    </Box>
                                                                </p>
                                                                <p className="mt-0 mb-6px text-13">
                                                                    <span className="text-muted">
                                                                        {' '}
                                                                    </span>
                                                                    <span className="font-medium">
                                                                        {product.category}
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
                                                        className="text-center"
                                                    >
                                                        <Button variant="text"  style={{  display: 'flex', fontSize: 11, textTransform: 'capitalize', float:'right'}}>Remove</Button>
                                                        <Button variant="text"  style={{  display: 'flex', fontSize: 11, textTransform: 'capitalize', float:'right'}}>Move to cart</Button>
                                                    </Grid>
                                                    
                                                    <Grid
                                                        item
                                                        lg={2}
                                                        md={2}
                                                        sm={2}
                                                        xs={2}
                                                        className="text-center"
                                                    >
                                                        <div className="flex justify-end items-center" style={{  display: 'block'}}>
                                                            <Box sx={{ display: 'block', flexDirection: 'row' }}>
                                                                <Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', marginLeft: 5}}>${product.price}</Box>
                                                                <Box sx={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row', textDecoration: 'line-through', alignItems: 'center', marginLeft: 5}}>${product.oldprice}</Box>
                                                            </Box>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </Grid >
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={0} style={{ border: '1px solid lightgray', marginLeft: 15, marginTop: 60 }}>
                            <Grid item xs={12}>                          
                                <Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>Total</Typography>
                                <Typography variant='h4' sx={{fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 2}}>&nbsp;&nbsp;$9</Typography>
                                <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'line-through', marginLeft: 4 }}>$12</Typography>
                                <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>88% off</Typography>
                                <Button variant="contained"  style={{textAlign: 'center', fontWeight: 'bold', paddingLeft: 15, marginLeft: 30, width: 285, marginBottom: 5, display: 'block'}} onClick={handleCheckoutClick}>Checkout</Button>
                                <Typography variant='h6' style={{ fontWeight: 'bold', paddingLeft: 8, flexDirection: 'row', marginLeft: 30 }}>Promotions</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                                        <IconButton>
											<Icon fontSize="small">clear</Icon>
										</IconButton>
                                        CYBER21
                                    </Typography>
                                    <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 1 }}>is applied</Typography>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginLeft: 4, marginBottom: 5}}>					
                                    <Box>
                                        <TextField
                                            variant='outlined'
                                            placeholder='Code'
                                            size='small'
                                        />
                                        <Button variant="contained"  style={{textAlign: 'center', fontWeight: 'bold', width: 55}} href="#contained-buttons">Apply</Button>
                                    </Box>
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
