import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import {
	Card,
	Checkbox,
	FormControlLabel,
	Grid,
	Button,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { signupWithEmail } from 'app/http/auth'
import { loginSuccess, startAuthenticate, authenticateFail } from 'app/redux-toolkit/slices/authSlice'

const useStyles = makeStyles(({ palette, ...theme }) => ({
	cardHolder: {
		background: '#1A2038',
	},
	card: {
		maxWidth: 800,
		borderRadius: 12,
		margin: '1rem',
	},
}))

const MessageStatus = {
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
	INIT: 'INIT'
}

const JwtRegister = () => {
	const classes = useStyles()
	const [userInfo, setUserInfo] = useState({
		username: 'khanhchuong',
		email: 'chuongtangkhanh2104@gmail.com',
		password: 'password'
	})
	const [message, setMessage] = useState({ status: MessageStatus.INIT, text: '' })
	const { mutate, isLoading } = useMutation(signupWithEmail, {
		mutationKey: 'signupWithEmail',
	})
	const dispatch = useDispatch()
	const history = useHistory()

	const handleChange = ({ target: { name, value } }) => {
		setUserInfo({
			...userInfo,
			[name]: value,
		})
	}

	const onRegisterSuccessfully = async (data) => {
		const { user, accessToken } = data
		const { username } = user
		setMessage({ status: MessageStatus.SUCCESS, text: `Welcome, ${username}` })

		console.log("Register 1")
		localStorage.setItem('userInfo', JSON.stringify({ user, accessToken }))
		setTimeout(() => {
			history.push('/')
		}, 1000)
	}

	const onError = (err) => {
		const errorStatus = err.response.status

		switch (errorStatus) {
			case 409:
				setMessage({ status: MessageStatus.ERROR, text: `Email already exist! Please select another email!` })
				break
			default:
				break
		}
		dispatch(authenticateFail(err))
	}

	const handleFormSubmit = (event) => {
		try {
			if (userInfo.email.length <= 5) {
				setMessage({ status: MessageStatus.ERROR, text: 'Email field must be at least 5 characters long!' })
				return
			}
			else if (userInfo.password.length <= 5) {
				setMessage({ status: MessageStatus.ERROR, text: 'Email field must be at least 5 characters long!' })
				return
			}

			dispatch(startAuthenticate())
			mutate(userInfo, {
				onSuccess: onRegisterSuccessfully,
				onError: onError,
			})

		} catch (err) {
			setMessage({ status: MessageStatus.ERROR, text: err.message })
		}
	}

	let { username, email, password, agreement } = userInfo

	return (
		<div
			className={clsx(
				'flex justify-center items-center  min-h-full-screen',
				classes.cardHolder
			)}
		>
			<Card className={classes.card}>
				<Grid container>
					<Grid item lg={5} md={5} sm={5} xs={12}>
						<div className='p-8 flex justify-center bg-light-gray items-center h-full'>
							<img
								className='w-full'
								src='/assets/images/illustrations/posting_photo.svg'
								alt=''
							/>
						</div>
					</Grid>
					<Grid item lg={7} md={7} sm={7} xs={12}>
						<div className='p-8 h-full'>
							<ValidatorForm onSubmit={handleFormSubmit}>
								<TextValidator
									className='mb-6 w-full'
									variant='outlined'
									size='small'
									label='Username'
									onChange={handleChange}
									type='text'
									name='username'
									value={username || ''}
									validators={['required']}
									errorMessages={['This field is required']}
								/>
								<TextValidator
									className='mb-6 w-full'
									variant='outlined'
									size='small'
									label='Email'
									onChange={handleChange}
									type='email'
									name='email'
									value={email || ''}
									validators={['required', 'isEmail']}
									errorMessages={[
										'This field is required',
										'Email is not valid',
									]}
								/>
								<TextValidator
									className='mb-4 w-full'
									label='Password'
									variant='outlined'
									size='small'
									onChange={handleChange}
									name='password'
									type='password'
									value={password || ''}
									validators={['required']}
									errorMessages={['This field is required']}
								/>
								<FormControlLabel
									className='mb-4'
									name='agreement'
									onChange={(e) =>
										handleChange({
											target: {
												name: 'agreement',
												value: e.target.checked,
											},
										})
									}
									control={
										<Checkbox
											size='small'
											checked={agreement || false}
										/>
									}
									label='I have read and agree to the terms of service.'
								/>
								{
									message.status === MessageStatus.INIT ? <></> : MessageStatus.SUCCESS ? (
										<p className='text-green'>{message.text}</p>
									) : (
										<p className='text-error'>{message.text}</p>
									)
								}
								<div className='flex items-center'>
									<Button
										className='capitalize'
										variant='contained'
										color='primary'
										type='submit'
									>
										Sign up
									</Button>
									<span className='mx-2 ml-5'>or</span>
									<Link to='/signin'>
										<Button className='capitalize'>
											Sign in
										</Button>
									</Link>
								</div>
							</ValidatorForm>
						</div>
					</Grid>
				</Grid>
			</Card>
		</div>
	)
}

export default JwtRegister
