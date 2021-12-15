import React from 'react'
import { Box, Stepper, Step, StepButton, Button, Typography, StepLabel, StepContent } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

import AppLayout from 'app/ElearningPlatform/Layout/AppLayout'
import InstructorManageCourseIntendedLearner from './InstructorManageCourseIntendedLearner'
import InstructorManageCourseCurriculum from './InstructorManageCourseCurriculum'
import InstructorManageCourseCaptions from './InstructorManageCourseCaptions'
import InstructorManageCourseLandingPage from './InstructorManageCourseLandingPage'
import InstructorManageCoursePricing from './InstructorManageCoursePricing'
import InstructorManageCoursePromotions from './InstructorManageCoursePromotions'
import InstructorManageCourseMessages from './InstructorManageCourseMessages'

const steps = [
  {
    id: 1,
    title: 'Intended learners',
    Component: InstructorManageCourseIntendedLearner
  },
  {
    id: 2,
    title: 'Curriculum',
    Component: InstructorManageCourseCurriculum

  },
  {
    id: 3,
    title: 'Captions (optional)',
    Component: InstructorManageCourseCaptions
  },
  {
    id: 4,
    title: 'Course landing page',
    Component: InstructorManageCourseLandingPage
  },
  {
    id: 5,
    title: 'Pricing',
    Component: InstructorManageCoursePricing
  },
  {
    id: 6,
    title: 'Promotions',
    Component: InstructorManageCoursePromotions
  },
  {
    id: 7,
    title: 'Course messages',
    Component: InstructorManageCourseMessages
  }
]

const InstructorManageCourse = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <AppLayout>
      <Box sx={{ mb: 10 }} />
      <Stepper nonLinear activeStep={activeStep} orientation='vertical'>
        {steps.map(({ id, title, Component }, index) => (
          <Step key={id} completed={completed[index]}>

            <StepButton color='inherit' onClick={handleStep(index)}>
              {title}
            </StepButton>
            <StepContent>
              <Component />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&aposre finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant='caption' sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default InstructorManageCourse 