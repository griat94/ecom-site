import React from 'react'

import './button.styles.scss'

export const BUTTON_TYPES = {
  google: 'google-authentication',
  inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${buttonType}`} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
