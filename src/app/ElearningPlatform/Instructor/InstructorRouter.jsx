import React from 'react'

const instructorRouter = [
  {
    path: '/instructor/courses',
    exact: true,
    component: React.lazy(() => import('./InstructorCourses/InstructorCourses'))
  },
  {
    path: '/instructor/courses/:id/manage',
    exact: true,
    component: React.lazy(() => import('./InstructorManageCourse/InstructorManageCourse'))
  },
  {
    path: '/instructor/communication',
    exact: true,
    component: React.lazy(() => import('./InstructorCommunication'))
  },
  {
    path: '/instructor/performances',
    exact: true,
    component: React.lazy(() => import('./InstructorPerformance'))
  },
  {
    path: '/instructor/resources',
    exact: true,
    component: React.lazy(() => import('./InstructorResources'))
  },
  {
    path: '/instructor/tools',
    exact: true,
    component: React.lazy(() => import('./InstructorTools'))
  }
]

export default instructorRouter
