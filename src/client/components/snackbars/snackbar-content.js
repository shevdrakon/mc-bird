import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextContainer = styled.div`
  opacity: 0;  
  transition: opacity .3s cubic-bezier(.4,0,1,1) 0ms;
  
  padding: 8px 0 8px 0;
  font-size: 1rem;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: .03125em;
  text-decoration: inherit;
  text-transform: inherit;
  margin-left: 0;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const ActionContainer = styled.div`
  padding-left: 24px;
  padding-right: 0;
  cursor: pointer;
  margin-left: auto;
`;

const Container = styled.div.attrs({
  'aria-hidden': props => !props.active,
})`
  min-width: 288px;
  max-width: 568px;
  border-radius: 2px;
  
  color: #fff;
  display: flex;
  padding: 6px 24px;
  flex-wrap: wrap;
  align-items: center;
  background-color: rgb(49, 49, 49);
    
  background-color: #2481d7;
  position: fixed;
  align-items: center;
  justify-content: flex-start;
  
  &[aria-hidden="false"] > ${TextContainer} {
    opacity: 1;
  }
`;

const SnackbarContent = (props) => {
  const {content, onClick, ...rest} = props;

  return (
    <Container {...rest}>
      <TextContainer>
        {content}
      </TextContainer>
      <ActionContainer onClick={onClick}>
        Action
      </ActionContainer>
    </Container>
  )
};

SnackbarContent.propTypes = {
  content: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SnackbarContent;
