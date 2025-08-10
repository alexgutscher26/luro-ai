'use client'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const AccessibilityChecker = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@axe-core/react').then((axe) => {
        axe.default(React, ReactDOM, 1000)
      })
    }
  }, [])

  return null
}

export default AccessibilityChecker