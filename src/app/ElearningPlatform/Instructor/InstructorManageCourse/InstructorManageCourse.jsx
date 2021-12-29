import React from 'react'
import { useQuery } from 'react-query'
import { Switch, Route, useParams } from 'react-router-dom'
import { Box, Card } from '@mui/material'

import AppLayout from 'app/ElearningPlatform/Layout/AppLayout'
import { searchCourseRequest } from 'app/http/course'

import IntructorManageSidebar from './InstructorManageSidebar'
import InstructorManageCourseIntendedLearner from './InstructorManageCourseIntendedLearner'
import InstructorManageCourseCurriculum from './InstructorManageCourseCurriculum'
import InstructorManageCourseCaptions from './InstructorManageCourseCaptions'
import InstructorManageCourseLandingPage from './InstructorManageCourseLandingPage'
import InstructorManageCoursePricing from './InstructorManageCoursePricing'
import InstructorManageCoursePromotions from './InstructorManageCoursePromotions'
import InstructorManageCourseMessages from './InstructorManageCourseMessages'
import { MatxLoading } from 'app/components'

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
  const { courseId } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${courseId}`, searchCourseRequest.bind(this, { queries: { _id: courseId } }))

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem', mt: 4 }}>
        <Box sx={{ flex: 2 }}>
          <IntructorManageSidebar navItems={navItems} course={data?.course} />
        </Box>
        <Card sx={{ flex: 8, mb: 4 }} elevation={3}>
          {
            isLoading ? <MatxLoading /> : (
              <Switch>
                {
                  navItems.map(item => (
                    <Route key={item.id} path={`/instructor/courses/:courseId/manage${item.to}`} component={(props) => <item.Component course={data.course} {...props} />} />
                  ))
                }
              </Switch>
            )
          }

        </Card>
      </Box>
    </AppLayout >
  )
}

export default InstructorManageCourse 
