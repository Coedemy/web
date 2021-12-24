
import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const IntructorManageSidebar = ({ navItems }) => {

  const location = useLocation()
  const { courseId } = useParams()
  const tabName = location.pathname.split('/')[location.pathname.split('/').length - 1]

  const selectedTab = navItems.indexOf(navItems.find(item => item.to === '/' + tabName))
  const [selectedIndex, setSelectedIndex] = useState(selectedTab)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
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
    </Box>
  )
}

export default IntructorManageSidebar