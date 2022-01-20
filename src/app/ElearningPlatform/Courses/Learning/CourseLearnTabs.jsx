import * as React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CourseLearnOverview from './CourseLearnOverview'
import CourseLearnQA from './CourseLearnQA'
import CourseLearnNotes from './CourseLearnNotes'
import CourseLearnAnnouncements from './CourseLearnAnnouncements'
import CourseLearnRating from './CourseLearnRating'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const CourseLearnTabs = ({ course, isPurchasedByUser, lecture }) => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  console.log({ course })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  console.log({ isPurchasedByUser })

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <>
        {
          isPurchasedByUser ? (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='inherit'
              aria-label='full width tabs example'
              sx={{ borderBottom: '2px solid lightgray' }}
            >
              <Tab label='Overview' {...a11yProps(0)} />
              <Tab label='Q & A' {...a11yProps(1)} />
              <Tab label='Notes' {...a11yProps(2)} />
              <Tab label='Announcements' {...a11yProps(3)} />
              <Tab label='Rating' {...a11yProps(4)} />
            </Tabs>
          ) : (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='inherit'
              aria-label='full width tabs example'
              sx={{ borderBottom: '2px solid lightgray' }}
            >
              <Tab label='Overview' {...a11yProps(0)} />
            </Tabs>
          )
        }
      </>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CourseLearnOverview course={course} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CourseLearnQA />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CourseLearnNotes />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <CourseLearnAnnouncements />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <CourseLearnRating course={course} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  )
}

export default CourseLearnTabs