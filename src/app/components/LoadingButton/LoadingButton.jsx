import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}))

const LoadingButton = (props) => {
  const { loading, label, onClick } = props
  const classes = useStyles()
  return (
    <div className='relative'>
      <Button
        {...props}
        variant='contained'
        color='primary'
        disabled={label === 'Saved'}
        onClick={onClick}
      >
        {label}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          className={classes.buttonProgress}
        />
      )}
    </div>
  )
}

export default LoadingButton
