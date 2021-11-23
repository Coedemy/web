import { combineReducers } from 'redux'
import scrumBoardReducer from './ScrumBoardReducer'
import notificationReducer from './NotificationReducer'
import ecommerceReducer from './EcommerceReducer'
import navigationReducer from './NavigationReducer'
import courseReducer from './courseReducer'

const RootReducer = combineReducers({
  notifications: notificationReducer,
  navigations: navigationReducer,
  scrumboard: scrumBoardReducer,
  ecommerce: ecommerceReducer,
  courses: courseReducer
})

export default RootReducer
