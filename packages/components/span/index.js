import React from 'react'
import PropTypes from 'prop-types'
import { span } from 'antd'


const QsrSpan = ({ classname, styleCss, title}) => {
  return (
    <span className={classname} style={styleCss} dangerouslySetInnerHTML={{ __html: title }}></span>    
  )
}

QsrSpan.propTypes = {
    classname: PropTypes.string,
    styleCss: PropTypes.object,
    title: PropTypes.string
}

export default QsrSpan
