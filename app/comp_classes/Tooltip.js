import React from 'react'
import PropTypes from 'prop-types'
import useHover from '../hooks/useHover'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}

export default function Tooltip({ message, children }) {

  const [hovering, attrs] = useHover()

  return (
    <div style={styles.container} {...attrs}>
      {hovering && <div style={styles.tooltip}>{message}</div>}
      {children}
    </div>

  )
}

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
}
