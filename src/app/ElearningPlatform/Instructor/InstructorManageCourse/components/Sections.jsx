import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import MenuIcon from '@mui/icons-material/Menu'
import { Card, Box } from '@mui/material'
import { Reorder } from './Reorder'
import Section from './Section'

// fake data generator
const getSections = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `sections-${k}`,
    content: `Section ${k}`,
    lectures: [`lecture-1`, `lecture-2`, `lecture-3`]
  }))

class Sections extends Component {
  constructor(props) {
    super(props)

    console.log(getSections(3))

    this.state = {
      sections: getSections(3)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      //console.log('no-change')
      return
    }

    if (result.type === 'QUESTIONS') {
      console.log(result)
      const sections = Reorder(
        this.state.sections,
        result.source.index,
        result.destination.index
      )

      this.setState({
        sections
      })
    } else {
      const lectures = Reorder(
        this.state.sections[parseInt(result.type, 10)].lectures,
        result.source.index,
        result.destination.index
      )

      const sections = JSON.parse(JSON.stringify(this.state.sections))

      sections[result.type].lectures = lectures

      this.setState({
        sections
      })
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        <Droppable droppableId='droppable' type='QUESTIONS'>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              sx={{ width: '100%', m: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            // style={getQuestionListStyle(snapshot.isDraggingOver)}
            >
              {this.state.sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{ p: '2rem', m: '0 0 1rem 0', backgroundColor: '#f7f9fa' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} {...provided.dragHandleProps}>
                        <Box><span style={{ fontWeight: 'bold' }}>Section {index + 1}:</span> {section.content}</Box>
                        <MenuIcon />
                      </Box>
                      <Box sx={{ mb: 4 }} />
                      <Section sectionIndex={index} section={section} />
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default Sections
