import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Box, Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { createSectionRequest, createLectureRequest, updateSectionsOrderRequest, updateLecturesOrderRequest } from 'app/http/course'
import { Reorder } from './Reorder'
import Section from './Section'

const getSections = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `sections-${k}`,
    title: `SECTION ${k}`,
    content: `Section ${k}`,
    lectures: [`Build a blog`, `Research a document`, `Connect to database`]
  }))

const Sections = ({ courseId, initSections }) => {
  const [expanded, setExpanded] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sections, setSections] = useState(initSections)
  const [sectionTitle, setSectionTitle] = useState('')
  const { mutate: mutateCreateSection } = useMutation(createSectionRequest)
  const { mutate: mutateCreateLecture } = useMutation(createLectureRequest)
  const { mutate: mutateUpdateSectionsOrder } = useMutation(updateSectionsOrderRequest)
  const { mutate: mutateUpdateLecturesOrder } = useMutation(updateLecturesOrderRequest)

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

    if (result.type === 'SECTIONS') {
      const reorderedSections = Reorder(
        sections,
        result.source.index,
        result.destination.index
      )
      setSections(reorderedSections)
      mutateUpdateSectionsOrder({ courseId, sourceIndex: result.source.index, destIndex: result.destination.index })
    } else {
      const sectionIndex = parseInt(result.type, 10)
      const lectures = Reorder(
        sections[sectionIndex].lectures,
        result.source.index,
        result.destination.index
      )
      const sectionId = result.draggableId.split('_')[0]

      const reorderedSections = JSON.parse(JSON.stringify(sections))
      reorderedSections[result.type].lectures = lectures
      setSections(reorderedSections)
      mutateUpdateLecturesOrder({ sectionId, sourceIndex: result.source.index, destIndex: result.destination.index })
    }
  }

  const addSection = () => {
    mutateCreateSection({ courseId, title: sectionTitle }, { onSuccess: onSectionCreated })
  }

  const deleteSection = () => {

  }

  const onSectionCreated = (data) => {
    const { newSection } = data
    const { _id, title } = newSection
    setSections(sections => [...sections, { _id, title, lectures: [] }])
    handleDialogClose()
  }

  const addLecture = ({ sectionId, lectureTitle }) => {
    mutateCreateLecture({ sectionId, title: lectureTitle }, { onSuccess: onLectureCreated })
  }

  const deleteLecture = () => {

  }

  const onLectureCreated = (data) => {
    const { section, newLecture } = data
    const tempSections = [...sections]
    tempSections.find(sec => sec._id === section._id).lectures.push({ _id: newLecture._id, title: newLecture.title })
    setSections(tempSections)
  }
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='droppable' type='SECTIONS'>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            sx={{ width: '100%', m: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section._id}
                draggableId={section._id}
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
            <Button variant='outlined' onClick={handleDialogOpen}>+ Add Section</Button>
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
