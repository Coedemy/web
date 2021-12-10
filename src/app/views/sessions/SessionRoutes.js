import NotFound from './NotFound'
import InternalServer from './InternalServer'
import ForgotPassword from './ForgotPassword'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'

const sessionRoutes = [
	{
		path: '/signup',
		component: JwtRegister,
	},
	{
		path: '/signin',
		component: JwtLogin,
	},
	{
		path: '/forgot-password',
		component: ForgotPassword,
	},
	{
		path: '/404',
		component: NotFound,
	},
	{
		path: '/500',
		component: InternalServer,
	},
]

export default sessionRoutes
