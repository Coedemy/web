import React, { useState } from 'react'
import { Tab, Tabs, Box, TextField, Typography, Button } from '@mui/material'
import FeedIcon from '@mui/icons-material/Feed'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { v4 as uuidv4 } from 'uuid'

const ContentType = {
  DOWNLOADABLE: 'DOWNLOADABLE',
  EXTERNAL: 'ARTICLE'
}

const TabPanel = ({ children, value, index, ...other }) => {

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const AddLectureResourses = () => {
  const [addMode, setAddMode] = useState(false)
  const [resource, setResource] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleTabIndexChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  const onSaveExternalUrl = () => {
    setResource({
      type: ContentType.EXTERNAL,
      content: { title, url }
    })
    setAddMode(false)
  }

  const uploadFile = (e) => {
    setResource({
      type: ContentType.DOWNLOADABLE,
      content: e.target.files[0]
    })
    setAddMode(false)
  }

  const deleteFile = (e) => {
    setResource(null)
    setAddMode(false)
    setTabIndex(0)
  }

  return (
    <Box sx={{ pt: 2 }}>
      {
        !addMode ? (
          resource ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pb: 2 }}>
                {
                  resource.type === ContentType.DOWNLOADABLE ? (
                    <><FeedIcon fontSize='small' />&nbsp;{resource.content.name}</>
                  ) : (
                    <><InsertLinkIcon fontSize='small' />&nbsp;{resource.content.title}</>
                  )
                }
              </Box>
              <Button variant='outlined' color='error' onClick={deleteFile}>Delete</Button>
            </Box>
          ) : <Button variant='outlined' onClick={() => setAddMode(true)}>+ Add Resourse</Button>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', mt: '1rem' }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabIndexChange} aria-label='basic tabs example'>
                  <Tab label='Downloadable File' {...a11yProps(0)} />
                  <Tab label='External Resource' {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tabIndex} index={0}>
                <Typography>Select Video</Typography>
                <TextField type='file' size='small' onChange={uploadFile} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography>Title</Typography>
                    <TextField sx={{ width: '100%' }} size='small' onChange={(e) => setTitle(e.target.value)} />
                    <Box sx={{ mb: 2 }} />
                    <Typography>URL</Typography>
                    <TextField sx={{ width: '100%' }} size='small' onChange={(e) => setUrl(e.target.value)} />
                  </Box>
                  <Box><Button variant='contained' onClick={onSaveExternalUrl}>Add</Button></Box>
                </Box>
              </TabPanel>
            </Box>
          </Box >
        )
      }
    </Box>
  )
}

export default AddLectureResourses
