import React from 'react'
import PropTypes from 'prop-types'

const EmptyState = ({ Title, Body, styleTitle, styleBody, styleImg, srcImg}) => {
  return (
    <div style={{padding:'10px', textAlign: 'center', marginTop: '50px'}}>
	    <div >
	      <img src={srcImg} style={styleImg}/>
	    </div>
	    <div style={styleTitle}> {Title} </div>
	    <div style={styleBody}> {Body} </div>
	</div>
  )
}

EmptyState.propTypes = {
  Title: PropTypes.string,
  Body: PropTypes.string,
  srcImg: PropTypes.string,
  styleValue: PropTypes.object,
  styleImg: PropTypes.object
}

export default EmptyState
