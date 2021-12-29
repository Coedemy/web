
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import { publishCourseRequest } from 'app/http/course'

const IntructorManageSidebar = ({ navItems, course }) => {
  const [canPublish, setCanPublish] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const location = useLocation()
  const { courseId } = useParams()
  const tabName = location.pathname.split('/')[location.pathname.split('/').length - 1]
  const { mutate, isLoading } = useMutation(publishCourseRequest)

  useEffect(() => {
    if (!course) return
    setCanPublish(!course.isPublished)
  }, [course])

  const selectedTab = navItems.indexOf(navItems.find(item => item.to === '/' + tabName))
  const [selectedIndex, setSelectedIndex] = useState(selectedTab)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }


  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const publishCourse = () => {
    console.log('publish')
    mutate({ courseId: course._id }, { onSuccess: onPublished })
  }

  const onPublished = () => {
    handleDialogOpen()
    setCanPublish(canPublish => !canPublish)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='main mailbox folders'>
        {
          navItems.map((item, index) => (
            <Link to={`/instructor/courses/${courseId}/manage${item.to}`} key={item.id}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          ))
        }
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button disabled={!course || isLoading} variant='contained' sx={{ flex: 1 }} onClick={publishCourse}>{canPublish ? 'Unpublish' : 'Publish'}</Button>
      </Box>
      <Dialog
        fullWidth={true}
        width='lg'
        open={dialogOpen}
      >
        <DialogTitle id='responsive-dialog-title'>
          Annoucement
        </DialogTitle>
        <DialogContent>
          <Typography>Your course is being processed. We will send you an email if the course is allowed to be published.</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' autoFocus onClick={handleDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default IntructorManageSidebar