import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'

// import schedulingRoutes from './modules/Scheduling/SchedulingRoutes'
// import financeRoutes from './modules/Finance/FinanceRoutes'
// import managementRoutes from './modules/Management/ManagementRoutes'
// import chatRoutes from './views/Chat/ChatRoutes'

import homeRouter from './ElearningPlatform/Home/HomeRouter'
import coursesRouter from './ElearningPlatform/Courses/CoursesRouter'

const redirectRoute = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/default" />,
  }
]

const errorRoute = [
  {
    component: () => <Redirect to="/404" />,
  }
]

const routes = [
  ...dashboardRoutes,
  ...materialRoutes,
  ...utilitiesRoutes,
  // ...financeRoutes,
  // ...chatRoutes,
  // ...schedulingRoutes,
  // ...managementRoutes,
  ...coursesRouter,
  ...homeRouter,
  ...chartsRoute,
  ...dragAndDropRoute,
  ...formsRoutes,
  ...mapRoutes,
  ...redirectRoute,
  ...errorRoute
]

export default routes
