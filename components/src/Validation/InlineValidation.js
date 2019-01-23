import React from 'react';
import styled from 'styled-components'
import theme from '../theme'
import Text from '../Type/Text'
import Icon from '../Icon/Icon'


export const InlineValidationMessage = styled.div`
  display: flex;
  color: ${theme.colors['red']};
`

const InlineValidationList = styled.ul`
  margin: 0;
`

const InlineValidationListItem = styled.li`
  font-size: ${theme.fontSizes['small']};
  line-height: ${theme.lineHeights['smallTextCompressed']};
`

const Wrapper = styled.div`
`

const InlineValidation = ({message, list}) => {
  return (
    <Wrapper>
      <InlineValidationMessage>
        <Icon size={theme.space[4]} name='error' mr={1} />
        <Text mb={0}>{message}</Text>
      </InlineValidationMessage>
      <InlineValidationList>
        <InlineValidationListItem>{list}</InlineValidationListItem>
      </InlineValidationList>
    </Wrapper>
  )
}

export default InlineValidation
