import React, {Component} from 'react'
import styled from 'styled-components'

import {bodyBackground, bodyContent} from '../../styles/layout'

import Container from '../layout/container'
import Header from '../layout/header'
import Footer from '../layout/footer'
import {SpinnerIcon} from '../icons'

const BodyBackground = styled.div`
  ${bodyBackground}
`;

const BodyContent = styled.div`
  ${bodyContent}
`;

const LoadingSection = styled.section`
  min-height: 500px;
  position: relative;
  
  display: flex;
  align-items: center;
  text-align: center;
`;

const Icon = styled(SpinnerIcon)`
  color: #9bb0bf
`;

const H3 = styled.h3`
  font-size: 34px;
`;

class PageNotFound extends Component {
  render() {
    return (
      <BodyBackground>
        <Header/>

        <BodyContent>
          <LoadingSection>
            <Container>
              <Icon height={60}/>
              <H3>MessageBird is loading...</H3>
            </Container>
          </LoadingSection>
        </BodyContent>

        <Footer/>
      </BodyBackground>
    )
  }
}

export default PageNotFound;