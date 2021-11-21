import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import {
  Typography, List, ListItem, ListItemIcon, ListItemText,
  Box, useMediaQuery
} from '@mui/material'
import NoteIcon from '@mui/icons-material/Note'
import QuizIcon from '@mui/icons-material/Quiz'
import slugify from 'slugify'

import sectionsData from '../../fakeData/sectionsData'

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

const CourseSectionsList = ({ chooseVideo }) => {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


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
                    <Link to={`/courses/learn/${slugify(lecture.title)}`} key={lecture.id}>
                      <ListItem disablePadding onClick={chooseVideo.bind(this, lecture)}>
                        <ListItemIcon>
                          {lecture.type === 'video' ? <PlayCircleOutlineIcon /> : lecture.type === 'article' ? <NoteIcon /> : <QuizIcon />}
                        </ListItemIcon>
                        <ListItemText primary={lecture.title} />
                        <Typography>06:15</Typography>
                      </ListItem>
                    </Link>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div >
  )
}

export default CourseSectionsList