import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import {
  Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box, Button, Zoom, Checkbox
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import QuizIcon from '@mui/icons-material/Quiz'

// import CourseLearnVideo from './CourseLearnVideo'
import { formatTime } from 'app/utils/time'
import { LightTooltip } from 'app/components'

import CourseLearnResources from './CourseLearnResources'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const LectureList = styled(List)(({ theme }) => ({
  width: '100%',
  bgcolor: 'background.paper',

  //change selected lecture's color
  '&& .Mui-selected, && .Mui-selected:hover, & .MuiListItemButton-root:hover': {
    backgroundColor: theme.palette.primary.main + '22',
    '&, & .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    },
  }
}))

const CourseLearnSections = ({ course, chooseLecture }) => {
  const userReducer = useSelector(state => state.user)
  const [lectureCode, setLectureCode] = useState('')
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const pathnameArray = location.pathname.split('/')
    const lectureId = pathnameArray[4]
    setLectureCode(`course${course._id}-lecture${lectureId}`)
  }, [])

  const selectLecture = ({ lecture }) => {
    setLectureCode(`course${course._id}-lecture${lecture._id}`)
    chooseLecture(lecture)
  }

  return (
    <Box>
      {
        course.sections.map(section => (
          <Accordion expanded={true} key={section._id}>
            <AccordionSummary sx={{ backgroundColor: '#e8e8e8' }}>
              <Typography><b>{section.title}</b></Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <LectureList aria-label='contacts' dense={true} autoFocus={true} >
                {
                  section.lectures.map((lecture, index) => (
                    <ListItemButton
                      selected={lectureCode === `course${course._id}-lecture${lecture._id}`}
                      onClick={selectLecture.bind(this, { lecture })}
                      key={lecture._id}
                    >
                      <ListItem disablePadding>
                        {
                          userReducer.myLearning.some(c => c._id === course._id) ? <Checkbox disabled checked={userReducer.learningProcess.includes(lecture._id)} /> : <Box />
                        }
                        <ListItemIcon>
                          {lecture.content.lectureContentType === 'VIDEO' ? <PlayCircleOutlineIcon /> : (lecture.content.lectureContentType === 'ARTICLE') ? <ArticleIcon /> : <QuizIcon />}
                        </ListItemIcon>
                        <ListItemText primary={`${lecture.title} (${lecture.content.lectureContentType === 'VIDEO' ? formatTime(lecture.content.video.duration) : '00:00'})`} />
                      </ListItem>

                      {
                        lecture.canPreview ? (
                          <LightTooltip placement='top' TransitionComponent={Zoom} title={<CourseLearnResources course={course} />}>
                            <Button variant='outlined' size='small' sx={{ pl: 2, pr: 2 }}>Resources</Button>
                          </LightTooltip>
                        ) : <></>
                      }

                    </ListItemButton>

                  ))}
              </LectureList>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Box>
  )
}

export default CourseLearnSections