import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import AppsIcon from '@mui/icons-material/Apps'

import { getItemStyle, getAnswerListStyle } from './Reorder'

const Lecture = ({ question, questionNum }) => {
  return (
    <Droppable droppableId={`droppable${question.id}`} type={`${questionNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getAnswerListStyle(snapshot.isDraggingOver)}
        >
          {question.answers.map((answer, index) => {
            return (
              <Draggable
                key={`${questionNum}${index}`}
                draggableId={`${questionNum}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <span {...provided.dragHandleProps}>

                      <AppsIcon
                        style={{ float: 'left' }} />
                    </span>
                    {answer}
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Lecture
