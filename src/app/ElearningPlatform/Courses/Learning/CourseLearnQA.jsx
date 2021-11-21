import React, { useState} from 'react'
import { TextField, Box, Icon, Button } from '@mui/material'

import CourseLearnTextEditor from './CourseLearnTextEditor'

const CourseLearnQA = () => {
  const [content, setContent] = useState('')

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{width: '80%'}}>
        <Box>
          <TextField
            variant='outlined'
            placeholder='Search all course questions'
            size='small'
            fullWidth
            InputProps={{
              startAdornment: (
                <Icon className='mr-3' fontSize='small'>
                  search
                </Icon>
              ),
            }}
          />
        </Box>
        <Box>
          <CourseLearnTextEditor
            content={content}
            handleContentChange={(content) => setContent(content)}
            placeholder='insert text here...'
          />
          <Button>Ask a new question</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseLearnQA
