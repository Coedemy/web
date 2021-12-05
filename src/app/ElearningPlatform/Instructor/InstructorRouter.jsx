import React from 'react'

const instructorRouter = [
  {
    path: '/instructor',
    exact: true,
    component: React.lazy(() => import('./InstructorCourses'))
  }
]

export default instructorRouter
