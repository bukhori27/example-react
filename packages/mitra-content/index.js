import React from 'react'
import PropTypes from 'prop-types'
import Routes from "@example/routes"

class AppContent extends React.Component {
  static contextTypes = {
    getContentBuffer: PropTypes.func,
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    return (
      <div className="utils__content">
        <Routes />
      </div>
    )
  }
}

export default AppContent
