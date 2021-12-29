import React from 'react'
import { useQuery } from 'react-query'
import { Box, Divider, Typography } from '@mui/material'

import { getCourseSectionsRequest } from 'app/http/course'
import { MatxLoading } from 'app/components'
import Sections from './components/Sections'

const InstructorManageCourseCurriculum = ({ course }) => {
  const { data, isLoading } = useQuery(`initSections${course._id}`, getCourseSectionsRequest.bind(this, { courseId: course._id }))

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          Curriculum
        </Typography>
      </Box>
      <Divider />
      {
        isLoading ? <MatxLoading /> : (
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 4 }}>
            <Sections courseId={course._id} initSections={data.courseSections} />
          </Box>
        )
      }
    </Box>
  )
}

export default InstructorManageCourseCurriculum  
