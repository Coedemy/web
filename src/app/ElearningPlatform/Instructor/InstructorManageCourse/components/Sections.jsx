import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { Reorder } from './Reorder'
import Section from './Section'


const getSections = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `sections-${k}`,
    title: `SECTION ${k}`,
    content: `Section ${k}`,
    lectures: [`Build a blog`, `Research a document`, `Connect to database`]
  }))

const Sections = () => {
  const [expanded, setExpanded] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sections, setSections] = useState(getSections(3))
  const [sectionTitle, setSectionTitle] = useState('')
  const theme = useTheme()

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleDialogClose = () => {
    setSectionTitle('')
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    if (result.type === 'QUESTIONS') {
      const reorderedSections = Reorder(
        sections,
        result.source.index,
        result.destination.index
      )
      setSections(reorderedSections)
    } else {
      const lectures = Reorder(
        sections[parseInt(result.type, 10)].lectures,
        result.source.index,
        result.destination.index
      )

      const reorderedSections = JSON.parse(JSON.stringify(sections))
      reorderedSections[result.type].lectures = lectures
      setSections(reorderedSections)
    }
  }

  const addSection = ({ title }) => {
    setSections(sections => [...sections, { id: `section${sections.length}`, title: sectionTitle, lectures: [] }])
    handleDialogClose()
  }

  const addLecture = ({ sectionIndex, lectureTitle }) => {
    const tempSections = [...sections]
    tempSections[sectionIndex].lectures.push(lectureTitle)
    setSections(tempSections)
  }

  const deleteSection = () => {

  }

  const deleteLecture = () => {

  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='droppable' type='QUESTIONS'>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            sx={{ width: '100%', m: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <Accordion
                    TransitionProps={{ unmountOnExit: true }}
                    expanded={expanded === `panel${index}`}
                    onChange={handleExpandChange(`panel${index}`)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{ p: '.2rem', m: '0 0 .2rem 0', backgroundColor: '#f7f9fa' }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} {...provided.dragHandleProps}>
                        <Box><span style={{ fontWeight: 'bold' }}>Section {index + 1}:</span> {section.title}</Box>
                        <MenuIcon sx={{ cursor: 'move' }} />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Section sectionIndex={index} section={section} addLecture={addLecture} />
                    </AccordionDetails>
                  </Accordion>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <Button variant='outlined' onClick={handleDialogOpen}>+ Add</Button>
            <Dialog
              fullWidth={true}
              width='lg'
              open={dialogOpen}
              aria-labelledby='responsive-dialog-title'
            >
              <DialogTitle id='responsive-dialog-title'>
                Create New Section
              </DialogTitle>
              <DialogContent>
                <TextField size='small' sx={{ width: '100%' }} value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
              </DialogContent>
              <DialogActions>
                <Button variant='outlined' autoFocus onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button variant='contained' autoFocus onClick={addSection}>
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )

}

export default Sections
