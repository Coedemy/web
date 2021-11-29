import React from 'react'

const coursesRouter = [
  // {
  //   path: '/courses/learn/:slug',
  //   exact: true,
  //   component: React.lazy(() => import('./Learning/CourseLearnPage')),
  // },
  {
    path: '/courses/:slug/lectures/:lectureId',
    exact: true,
    component: React.lazy(() => import('./Learning/CourseLearnPage')),
  },
  {
    path: '/courses/:slug',
    exact: true,
    component: React.lazy(() => import('./CourseDetail')),
  },
]

export default coursesRouter
