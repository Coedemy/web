import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import {
  Typography, List, ListItem, ListItemIcon, ListItemText,
  Box, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, useMediaQuery
} from '@mui/material'
import NoteIcon from '@mui/icons-material/Note'
import QuizIcon from '@mui/icons-material/Quiz'

import sectionsData from './sectionsData'
import CourseVideo from './CourseVideo'

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

const CourseSectionsList = () => {

  const [videoSrc, setVideoSrc] = useState()
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = (lecture) => {
    if (lecture.type !== 'video') return
    setVideoSrc(lecture.videoSrc)
    setOpen(true)
  }

  const handleClose = () => {
    console.log(open)
    setOpen(false)
  }

  const [expanded, setExpanded] = useState('')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      {
        sectionsData.map(section => (
          <Accordion expanded={expanded === section.id} onChange={handleChange(section.id)} key={section.id}>
            <AccordionSummary>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Typography>{section.title}</Typography>
                <Typography>{section.lectures.length} Lectures • 3hr 34min</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-label="contacts"
              >
                {
                  section.lectures.map(lecture => (
                    <div key={lecture.id}>
                      <ListItem disablePadding onClick={handleClickOpen.bind(this, lecture)}>
                        <ListItemIcon>
                          {lecture.type === 'video' ? <PlayCircleOutlineIcon /> : lecture.type === 'article' ? <NoteIcon /> : <QuizIcon />}
                        </ListItemIcon>
                        <ListItemText primary={lecture.title} />
                        <Typography>06:15</Typography>
                      </ListItem>
                    </div>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      }

      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <CourseVideo videoSrc={videoSrc} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    </div >
  )
}

export default CourseSectionsList