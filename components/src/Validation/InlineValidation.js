import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import theme from '../theme'
import Text from '../Type/Text'
import Icon from '../Icon/Icon'
import Flex from '../Flex/Flex'
import Box from '../Box/Box'
import icons from '../../icons/icons.json'

export const iconNames = Object.keys(icons)

const List = styled.ul`
  -webkit-font-smoothing: antialiased;
  margin: 0;
`

const InlineValidation = (props) => {
  return (
    <Box color ={props.color}>
      <Flex my={2}>
        <Icon size={theme.space[4]} name={props.icon} mr={1} />
        <Text mb={0}>{props.message}</Text>
      </Flex>
      <List>
        {props.children}
      </List>
    </Box>
  )
}

InlineValidation.defaultProps = {
  color: 'red',
  icon: 'error'
}

InlineValidation.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  message: PropTypes.string,
  color: PropTypes.string
} 

export default InlineValidation
