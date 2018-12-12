import Box from '../Box/Box';

import styled from 'styled-components'
import {
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
  propTypes
} from 'styled-system';

const Flex = styled(Box)({
  display: 'flex'
},
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent
)

Flex.displayName = 'Flex'

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes,
}

Flex.displayName = 'Flex'

export default Flex