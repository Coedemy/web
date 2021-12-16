import React from 'react'
import { Box, Card } from '@mui/material'
import { Switch, Route, useParams } from 'react-router-dom'

import AppLayout from 'app/ElearningPlatform/Layout/AppLayout'

import IntructorManageSidebar from './InstructorManageSidebar'
import InstructorManageCourseIntendedLearner from './InstructorManageCourseIntendedLearner'
import InstructorManageCourseCurriculum from './InstructorManageCourseCurriculum'
import InstructorManageCourseCaptions from './InstructorManageCourseCaptions'
import InstructorManageCourseLandingPage from './InstructorManageCourseLandingPage'
import InstructorManageCoursePricing from './InstructorManageCoursePricing'
import InstructorManageCoursePromotions from './InstructorManageCoursePromotions'
import InstructorManageCourseMessages from './InstructorManageCourseMessages'

const navItems = [
  {
    id: 1,
    title: 'Intended learners',
    Component: InstructorManageCourseIntendedLearner,
    to: '/goals'
  },
  {
    id: 2,
    title: 'Curriculum',
    Component: InstructorManageCourseCurriculum,
    to: '/curriculum'

  },
  {
    id: 3,
    title: 'Captions (optional)',
    Component: InstructorManageCourseCaptions,
    to: '/captions'
  },
  {
    id: 4,
    title: 'Course landing page',
    Component: InstructorManageCourseLandingPage,
    to: '/basics'
  },
  {
    id: 5,
    title: 'Pricing',
    Component: InstructorManageCoursePricing,
    to: '/pricing'
  },
  {
    id: 6,
    title: 'Promotions',
    Component: InstructorManageCoursePromotions,
    to: '/promotions'
  },
  {
    id: 7,
    title: 'Course messages',
    Component: InstructorManageCourseMessages,
    to: '/messages'
  }
]

const InstructorManageCourse = () => {


  return (
    <AppLayout>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem', mt: 4 }}>
        <Box sx={{ flex: 2 }}>
          <IntructorManageSidebar navItems={navItems} />
        </Box>
        <Card sx={{ flex: 8, mb: 4 }} elevation={3}>
          <Switch>
            {
              navItems.map(item => (
                <Route key={item.id} path={`/instructor/courses/:courseId/manage${item.to}`} component={item.Component} />
              ))
            }
          </Switch>
        </Card>
      </Box>
    </AppLayout >
  )
}

export default InstructorManageCourse 
