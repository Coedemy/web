import React, {
	useContext,
	useEffect,
	useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'
import { loginSuccess } from 'app/redux-toolkit/slices/authSlice'

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

	const [previouseRoute, setPreviousRoute] = useState(null)
	const { pathname } = useLocation()
	const dispatch = useDispatch()

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		if (!userInfo || !userInfo.accessToken) return
		const { user, accessToken } = userInfo
		dispatch(loginSuccess({ user, accessToken }))
	}, [])

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
