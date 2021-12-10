import React, { useState } from 'react'
import { Box, Checkbox, Divider, Icon, Rating, Button, Radio, FormControlLabel, Grid, RadioGroup, MenuItem, Typography, IconButton, TextField, FormControl, Select } from '@mui/material'
import AppLayout from '../Layout/AppLayout'
import { orange } from 'app/utils/color'
import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { formatToVND } from 'app/utils/formatter'




const RatingNumber = styled.strong`
  font-size: 14px;
  color: ${orange};
  margin-right: 8px;
`

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

const nations = [
    { id: 0, title: 'ThaiLand' },
    { id: 1, title: 'Campuchia' },
    { id: 2, title: 'Dong Lao' },
    { id: 3, title: 'China' }]

const Checkout = () => {
    const [curCategory, setCurCategory] = useState('')

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
                            <FormControl sx={{ minWidth: 220, mt:1, nb: 1 }}>
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
                            </FormControl>
                        </Box>
                        <Box container spacing={2} style={{border: '1px solid lightgray', backgroundColor: 'white', padding: 32, marginTop: 10 }}>
                            <RadioGroup className="mb-12" value={gender || ''} name="gender" onChange={handleChangeTick} row>
                                <FormControlLabel
                                    value="New Payment Cart"
                                    control={<Radio color="secondary" />}
                                    label="New Payment Cart"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="Paypal"
                                    control={<Radio color="secondary" />}
                                    label="Paypal"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            <ValidatorForm onError={() => null}>
                                <Grid container spacing={6}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextValidator
                                            className="mb-4 w-full"
                                            label="Name on Card"
                                            onChange={handleChange}
                                            type="text"
                                            name="Name on Card"
                                            value={username || ''}
                                            validators={[
                                                'required',
                                                'minStringLength: 4',
                                                'maxStringLength: 9',
                                            ]}
                                            errorMessages={['this field is required']}
                                        />
                                        <TextValidator
                                            className="mb-4 w-full"
                                            label="Cart Number"
                                            onChange={handleChange}
                                            type="text"
                                            name="Cart Number"
                                            value={firstName || ''}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                        <TextValidator
                                            className="mb-4 w-full"
                                            label="MM/YY"
                                            onChange={handleChange}
                                            type="text"
                                            name="MM/YY"
                                            value={email || ''}
                                            validators={['required', 'isEmail']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextValidator
                                            className="mb-4 w-full"
                                            label="Security"
                                            onChange={handleChange}
                                            type="text"
                                            name="Security"
                                            value={mobile || ''}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                        <TextValidator
                                            className="mb-4 w-full"
                                            label="Zip/Postal Code"
                                            onChange={handleChange}
                                            name="text"
                                            type="Zip/Postal Code"
                                            value={password || ''}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </Grid>
                                </Grid>
                                <FormControlLabel control={<Checkbox />} label="Remember this card"/>
                            </ValidatorForm>
                        </Box>
                        <Typography variant='h6' style={{ fontWeight: 'bold', flexDirection: 'row', marginTop: 20 }}>Order Detail</Typography> 
                        <Box container spacing={2} style={{border: '1px solid lightgray', backgroundColor: 'white', padding: 32, marginTop: 10 }}>
                            <Grid item xs={12}>
                                <div className="overflow-auto">
                                    <div className="min-w-600">
                                        <div className="py-3">
                                            <Grid container>
                                                <Grid item lg={10} md={10} sm={10} xs={10}>
                                                    <h6 className="m-0 font-medium">
                                                        Product Details
                                                    </h6>
                                                </Grid>                                               
                                                <Grid item lg={2} md={2} sm={2} xs={2} className="text-center">
                                                    <h6 className="m-0 font-medium">Price</h6>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Divider />
                                        {dummyProductList.map((product) => (
                                            <div key={product.id} className="py-4">
                                                <Grid container alignItems="center">
                                                    <Grid item lg={10} md={10} sm={10} xs={10}>
                                                        <div className="flex">
                                                            <img className="border-radius-4 w-100 mr-3" src={product.imgUrl} alt={product.title}/>
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
                                                    <Grid item lg={2} md={2} sm={2} xs={2} className="text-center">
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
                        </Box > 
                    </Grid>                        
                    <Grid item xs={4}>
                        <Box container spacing={0} style={{ border: '1px solid lightgray', marginTop: 110 }}>
                            <Box sx={{ m : 3 }}>
                                <Box item xs={12}>                          
                                    <Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px'}}>Summary</Typography>
                                    <Grid item xs={12}>
                                        <div>
                                            <Grid container>
                                                <Grid item lg={9} md={9} sm={9} xs={9}>
                                                    <h6 style={{fontSize: '20px'}}>
                                                        Original price:
                                                    </h6>
                                                </Grid>                                               
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <h6 style={{fontSize: '20px', position: 'right'}}>$169.98</h6>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div>
                                            <Grid container>
                                                <Grid item lg={9} md={9} sm={9} xs={9}>
                                                    <h6 style={{fontSize: '20px'}}>
                                                        Coupon discounts:
                                                    </h6>
                                                </Grid>                                               
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <h6 style={{fontSize: '20px'}}>-$50.00</h6>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Divider />
                                    <Box sx={{ marginTop: 2 }} />
                                    <Grid item xs={12}>
                                        <div>
                                            <Grid container>
                                                <Grid item lg={9} md={9} sm={9} xs={9}>
                                                    <h6 style={{fontSize: '20px'}}>
                                                        Total:
                                                    </h6>
                                                </Grid>                                               
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <h6 style={{fontSize: '20px', position: 'right'}}>$19.98</h6>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Typography sx={{ fontSize: 10 ,display: 'flex', flexDirection: 'row', alignItems: 'center'}}>Coedemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</Typography>
                                    <Box sx={{ marginBottom: 4 }} />
                                    <Button variant="contained"  style={{textAlign: 'center', fontWeight: 'bold', display: 'block', width: '100%'}}>Complete Payment</Button>
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
}

export default Checkout
