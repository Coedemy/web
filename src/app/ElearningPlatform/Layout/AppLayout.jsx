import React from 'react'
import styled from 'styled-components'

const gap = 16
const HORIZONTAL_MARGIN = 200

const HomeWrapper = styled.div`
  background-color: white;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HomeContentWrapper = styled.div`
  width: 70%;
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
