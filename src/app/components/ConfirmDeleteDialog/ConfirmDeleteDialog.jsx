import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material'

const SimpleDialog = ({ title, content, onSubmit, onClose, onOpen }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogClose = () => {
    if (onClose) onClose()
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
    if (onOpen) onOpen()
  }

  const handleSubmit = (e) => {
    if (onSubmit) onSubmit(e)
    handleDialogClose()
  }

  return (
    <>
      {/* <Button variant='outlined' onClick={handleDialogOpen}>+ Add Lecture</Button> */}
      <IconButton onClick={handleDialogOpen}>
        <DeleteOutlineIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        width='lg'
        open={dialogOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' autoFocus onClick={handleDialogClose}>
            No
          </Button>
          <Button variant='contained' color='error' autoFocus onClick={handleSubmit}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SimpleDialog
