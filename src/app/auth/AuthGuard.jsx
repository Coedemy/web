import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'

import { loginSuccess } from 'app/redux-toolkit/slices/authSlice'
import { loadUserProperties } from 'app/redux-toolkit/slices/userSlice'
import { authenticateFail } from 'app/redux-toolkit/slices/authSlice'
import { initCart } from 'app/http/user'

// const getUserRoleAuthStatus = (pathname, user, routes) => {
// 	const matched = routes.find((r) => r.path === pathname)

// 	const authenticated =
// 		matched && matched.auth && matched.auth.length
// 			? matched.auth.includes(user.role)
// 			: true
// 	console.log(matched, user)
// 	return authenticated
// }

const AuthGuard = ({ children }) => {

	const { mutate, isLoading } = useMutation(initCart, {
		mutationKey: 'initCart',
	})
	const userReducer = useSelector(state => state.user)
	const [previouseRoute, setPreviousRoute] = useState(null)
	const { pathname } = useLocation()
	const dispatch = useDispatch()

	const onLoadSuccessfully = async (data) => {
		const { cart } = data
		localStorage.setItem('cart', JSON.stringify(cart))
		dispatch(loadUserProperties())
	}

	const onError = (err) => {
		dispatch(authenticateFail(err))
	}

	useEffect(() => {
		dispatch(loadUserProperties())
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		if (!userInfo || !userInfo.accessToken) return
		const { user, accessToken } = userInfo
		console.log('Login 1')
		dispatch(loginSuccess({ user, accessToken }))
	}, [])

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))

		if (!userReducer.isLoading && userInfo && userInfo.accessToken) {
			mutate({ cart: userReducer.cart }, {
				onSuccess: onLoadSuccessfully,
				onError: onError,
			})
		}
	}, [userReducer.isLoading])

	// const { routes } = useContext(AppContext)
	// const isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user, routes)
	// let authenticated = isAuthenticated && isUserRoleAuthenticated

	// IF YOU NEED ROLE BASED AUTHENTICATION,
	// UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
	// AND COMMENT OUT BELOW LINE
	// let authenticated = isAuthenticated

	useEffect(() => {
		if (previouseRoute !== null) setPreviousRoute(pathname)
	}, [pathname, previouseRoute])

	return <>{children}</>
	// if (authenticated) return <>{children}</>
	// else {
	// 	return (
	// 		<Redirect
	// 			to={{
	// 				pathname: '/session/signin',
	// 				state: { redirectUrl: previouseRoute },
	// 			}}
	// 		/>
	// 	)
	// }
}

export default AuthGuard
