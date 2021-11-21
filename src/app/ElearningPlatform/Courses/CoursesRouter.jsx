import React from 'react'

const coursesRouter = [
  {
    path: '/courses/learn/:slug',
    exact: true,
    component: React.lazy(() => import('./Learning/CourseLearnPage')),
  },
  {
    path: '/courses/:id',
    exact: true,
    component: React.lazy(() => import('./CourseDetail')),
  },
]

export default coursesRouter
