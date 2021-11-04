import React from "react";
import PropTypes from "prop-types";

class WindowDimensions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { width, height } = this.state;
    const { children: renderMenu } = this.props;

    return renderMenu({
      windowWidth: width,
      windowHeight: height,
    });
  }
}

WindowDimensions.propTypes = {
  children: PropTypes.func.isRequired,
};

const withWindowDimensions = (Component) => (props) =>
  (
    <WindowDimensions>
      {(windowDimensions) => (
        <Component windowDimensions={windowDimensions} {...props} />
      )}
    </WindowDimensions>
  );

export default withWindowDimensions;
