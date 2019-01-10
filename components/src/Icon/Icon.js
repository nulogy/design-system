import React from 'react';
import PropTypes from 'prop-types';
import {
  Add,
  Cancel,
  Check,
  Delete,
  Domain,
  Edit,
  Lock,
  LockOpen,
  Menu,
  Person,
  Save,
  Search,
} from 'rmdi';

export const Svgs = {
  add: Add,
  building: Domain,
  cancel: Cancel,
  check: Check,
  delete: Delete,
  edit: Edit,
  lock: Lock,
  menu: Menu,
  save: Save,
  search: Search,
  unlock: LockOpen,
  user: Person,
}

export const names = Object.keys(Svgs);

const iconSizeRatio = "1em";

const ABC = () => (<div/>);

const Icon = ({name, IconSvg = Svgs[name], ...props}) => {
  return(
    <IconSvg 
      aria-hidden={!props.title}
        style={{top: (props.size/8)||"0.125em", position: "relative"}} 
        size={props.size||iconSizeRatio} 
          {...props}
      />
  )
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,  
  title: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};

Icon.defaultProps = {}

export default Icon;