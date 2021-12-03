import NotFound from './NotFound'
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
]

export default sessionRoutes
