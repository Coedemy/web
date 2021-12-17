import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { getItemStyle, getSectionListStyle } from './Reorder'
import Lecture from './Lecture'

const Section = ({ section, sectionIndex }) => {
  return (
    <Droppable droppableId={`droppable${section.id}`} type={`${sectionIndex}`}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          sx={{ p: '20px', width: '100%' }}
        // sx={{ width: '1m00%', m: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        // style={getSectionListStyle(snapshot.isDraggingOver)}
        >
          {section.lectures.map((lecture, index) => {
            return (
              <Draggable
                key={`${sectionIndex}${index}`}
                draggableId={`${sectionIndex}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                      p: '20px',
                      m: '0 0 10px 0',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}
                    {...provided.dragHandleProps}
                  >
                    <Lecture index={index} lecture={lecture} />
                  </Card>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  )
}

export default Section
