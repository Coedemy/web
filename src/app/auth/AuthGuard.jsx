import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'

import { loginSuccess } from 'app/redux-toolkit/slices/authSlice'
import { loadCart, loadAuthenticatedUserProperties } from 'app/redux-toolkit/slices/userSlice'
import { authenticateFail } from 'app/redux-toolkit/slices/authSlice'
import { loadCartRequest, loadAuthenticatedUserPropertiesRequest } from 'app/http/user'

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

	const { mutate: mutateLoadCart } = useMutation(loadCartRequest, {
		mutationKey: 'loadCart',
	})
	const { mutate: mutateLoadAuthenticatedUserProperties } = useMutation(loadAuthenticatedUserPropertiesRequest, {
		mutationKey: 'loadAuthenticatedUserProperties',
	})
	const userReducer = useSelector(state => state.user)
	const [previouseRoute, setPreviousRoute] = useState(null)
	const { pathname } = useLocation()
	const dispatch = useDispatch()

	const onLoadCartSuccessfully = async (data) => {
		const { cart } = data
		localStorage.setItem('cart', JSON.stringify(cart))
		dispatch(loadCart())
	}

	const onLoadPropertiesSuccessfully = async (data) => {
		dispatch(loadAuthenticatedUserProperties(data))
	}

	const onError = (err) => {
		dispatch(authenticateFail(err))
	}

	useEffect(() => {
		dispatch(loadCart())
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		if (!userInfo || !userInfo.accessToken) return
		const { user, accessToken } = userInfo
		console.log('Login 1')
		dispatch(loginSuccess({ user, accessToken }))
	}, [])

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))

		if (!userReducer.isLoading && userInfo && userInfo.accessToken) {
			mutateLoadCart({ cart: userReducer.cart }, {
				onSuccess: onLoadCartSuccessfully,
				onError: onError,
			})
			mutateLoadAuthenticatedUserProperties({}, {
				onSuccess: onLoadPropertiesSuccessfully,
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
