import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import {
  Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton,
  Box, Button, Grid
} from '@mui/material'
import NoteIcon from '@mui/icons-material/Note'
import QuizIcon from '@mui/icons-material/Quiz'

// import CourseVideo from './CourseVideo'

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
      : '#e8e8e8',
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

const LectureItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: '#f8f8f8',
  border: '1px solid white',

  '&:hover': {
    backgroundColor: theme.palette.primary.main + '22',
    color: theme.palette.primary.main,

    '& .item-icon': {
      color: theme.palette.primary.main,
    },
  }
}))

const CourseCurriculum = ({ course }) => {

  // const [videoSrc, setVideoSrc] = useState()
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = (lecture) => {
    // if(!lecture.canPreview)  return
    // if (lecture.content.lectureContentType !== 'VIDEO') return
    // setVideoSrc(lecture.content.videoUrl)
    // setOpen(true)
  }

  const handleClose = () => {
    console.log(open)
    setOpen(false)
  }

  // const [expanded, setExpanded] = useState('')

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false)
  // }

  return (
    <Grid item xs={12}>
      <Box sx={{ mb: 4 }} />
      <Typography variant='h5' style={{ fontWeight: 'bold' }}>Course Curriculum</Typography>
      <Box sx={{ mb: 2 }} />
      <Typography variant='body2'>2 sections | 3 lectures</Typography>
      <Box sx={{ mb: 2 }} />
      <div>
        {
          course.sections.map(section => (
            <Accordion expanded={true} key={section._id}>
              <AccordionSummary>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <Typography><b>{section.title}</b></Typography>
                  <Typography>{section.lectures.length} Lectures • 3hr 34min</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <List
                  sx={{ width: '100%', bgcolor: 'background.paper' }}
                  aria-label="contacts"
                  dense={true}
                >
                  {
                    section.lectures.map(lecture => (
                      <Link to={`/courses/${course.slug}/lectures/${lecture._id}`} key={lecture._id}>
                        <LectureItemButton>
                            <ListItem disablePadding key={lecture._id}>
                              <ListItemIcon className='item-icon'>
                                {lecture.content.lectureContentType === 'VIDEO' ? <PlayCircleOutlineIcon /> : lecture.type === 'ARTICLE' ? <NoteIcon /> : <QuizIcon />}
                              </ListItemIcon>
                              <ListItemText primary={`${lecture.title} (06:05)`} />
                              {lecture.canPreview ? <Button size='small' variant='contained'>Preview</Button> : <Button size='small' variant='contained' disabled>Start</Button>}
                            </ListItem>
                        </LectureItemButton>
                      </Link>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
      <Box sx={{ mb: 4 }} />
    </Grid>
  )
}

export default CourseCurriculum