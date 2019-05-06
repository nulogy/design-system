import React from "react";
import PropTypes from "prop-types";

class DetectOutsideClick extends React.Component {
  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("touchstart", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("touchstart", this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    const { onClick, clickRef } = this.props;
    let clickedOutside = true;

    if (Array.isArray(clickRef)) {
      clickRef.forEach(ref => {
        if (ref && ref.contains(e.target)) {
          clickedOutside = false;
        }
      });
    } else if (clickRef && clickRef.contains(e.target)) {
      clickedOutside = false;
    }

    if (clickedOutside) onClick(e);
  }

  render() {
    const { children } = this.props;

    return <>{children}</>;
  }
}

DetectOutsideClick.propTypes = {
  onClick: PropTypes.func.isRequired,
  clickRef: PropTypes.oneOfType([PropTypes.instanceOf(Element), PropTypes.arrayOf(PropTypes.instanceOf(Element))])
    .isRequired,
  children: PropTypes.node
};

DetectOutsideClick.defaultProps = {
  children: undefined
};

export default DetectOutsideClick;
