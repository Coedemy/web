import React from 'react'
import styled from 'styled-components'

const gap = 16
const HORIZONTAL_MARGIN = 200

const HomeWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HomeContentWrapper = styled.div`
  max-width: 70%;
`

const AppLayout = ({ children }) => {
  return (
    <HomeWrapper>
      <HomeContentWrapper>
        {children}
      </HomeContentWrapper>
    </HomeWrapper>
  )
}

export default AppLayout
