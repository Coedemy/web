import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
	Card,
	Checkbox,
	FormControlLabel,
	Grid,
	Button,
	CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import clsx from 'clsx'

import { loginWithEmail } from 'app/http/auth'
import { loginSuccess, startLogin, loginFail } from 'app/redux-toolkit/slices/authSlice'

const useStyles = makeStyles(({ palette, ...theme }) => ({
	cardHolder: {
		background: '#1A2038',
	},
	card: {
		maxWidth: 800,
		borderRadius: 12,
		margin: '1rem',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}))

const MessageStatus = {
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
	INIT: 'INIT'
}

const JwtLogin = () => {
	const classes = useStyles()
	const history = useHistory()

	const [userInfo, setUserInfo] = useState({
		email: 'chuongtangkhanh@gmail.com',
		password: 'password'
	})
	const [message, setMessage] = useState({ status: MessageStatus.INIT, text: '' })

	const { mutate, isLoading } = useMutation(loginWithEmail, {
		mutationKey: 'loginWithEmail',
	})
	const dispatch = useDispatch()

	const onLoginSuccessfully = async (data) => {
		const { user, accessToken } = data
		const { username } = user
		setMessage({ status: MessageStatus.SUCCESS, text: `Welcome, ${username}` })
		setTimeout(() => {
			dispatch(loginSuccess({ user, accessToken }))
			history.push('/')
		}, 1000)
	}

	const onError = (err) => {
		const errorStatus = err.response.status

		switch (errorStatus) {
			case 401:
				setMessage({ status: MessageStatus.ERROR, text: `Wrong password!` })
				break
			case 409:
				setMessage({ status: MessageStatus.ERROR, text: `This email does not exist!` })
				break
			default:
				break
		}
		dispatch(loginFail(err))
	}

	const onLogin = (event) => {
		try {
			if (userInfo.email.length <= 5) {
				setMessage({ status: MessageStatus.ERROR, text: 'Email field must be at least 5 characters long!' })
				return
			}
			else if (userInfo.password.length <= 5) {
				setMessage({ status: MessageStatus.ERROR, text: 'Email field must be at least 5 characters long!' })
				return
			}

			dispatch(startLogin())

			mutate(userInfo, {
				onSuccess: onLoginSuccessfully,
				onError: onError,
			})
		} catch (err) {
			setMessage({ status: MessageStatus.ERROR, text: err.message })
		}
	}

	const handleChange = ({ target: { name, value } }) => {
		let temp = { ...userInfo }
		temp[name] = value
		setUserInfo(temp)
	}

	// const handleFormSubmit = async (event) => {
	// 	setLoading(true)
	// 	try {
	// 		await login(userInfo.email, userInfo.password)
	// 		history.push('/')
	// 	} catch (e) {
	// 		console.log(e)
	// 		setMessage(e.message)
	// 		setLoading(false)
	// 	}
	// }

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
						<div className='p-8 flex justify-center items-center h-full'>
							<img
								className='w-200'
								src='/assets/images/illustrations/dreamer.svg'
								alt=''
							/>
						</div>
					</Grid>
					<Grid item lg={7} md={7} sm={7} xs={12}>
						<div className='p-8 h-full bg-light-gray relative'>
							<ValidatorForm onSubmit={onLogin}>
								<TextValidator
									className='mb-6 w-full'
									variant='outlined'
									size='small'
									label='Email'
									onChange={handleChange}
									type='email'
									name='email'
									value={userInfo.email}
									validators={['required', 'isEmail']}
									errorMessages={[
										'this field is required',
										'email is not valid',
									]}
								/>
								<TextValidator
									className='mb-3 w-full'
									label='Password'
									variant='outlined'
									size='small'
									onChange={handleChange}
									name='password'
									type='password'
									value={userInfo.password}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<FormControlLabel
									className='mb-3 min-w-288'
									name='agreement'
									onChange={handleChange}
									control={
										<Checkbox
											size='small'
											onChange={({
												target: { checked },
											}) =>
												handleChange({
													target: {
														name: 'agreement',
														value: checked,
													},
												})
											}
											checked={userInfo.agreement || true}
										/>
									}
									label='Remeber me'
								/>

								{
									message.status === MessageStatus.INIT ? <></> : MessageStatus.SUCCESS ? (
										<p className='text-error'>{message.text}</p>
									) : (
										<p className='text-error'>{message.text}</p>
									)
								}

								<div className='flex flex-wrap items-center mb-4'>
									<div className='relative'>
										<Button
											variant='contained'
											color='primary'
											disabled={isLoading}
											type='submit'
										>
											Sign in
										</Button>
										{isLoading && (
											<CircularProgress
												size={24}
												className={
													classes.buttonProgress
												}
											/>
										)}
									</div>
									<span className='mr-2 ml-5'>or</span>
									<Button
										className='capitalize'
										onClick={() =>
											history.push('/signup')
										}
									>
										Sign up
									</Button>
								</div>
								<Button
									className='text-primary'
									onClick={() =>
										history.push('/forgot-password')
									}
								>
									Forgot password?
								</Button>
							</ValidatorForm>
						</div>
					</Grid>
				</Grid>
			</Card>
		</div>
	)
}

export default JwtLogin
