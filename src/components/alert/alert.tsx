import React from 'react'
import './alert.scss'

interface I_AlertProps {
  type: string
  text: string
}

export function Alert({ type, text }: I_AlertProps) {
  const className = type === 'error' ? 'error-alert' : 'info-alert'
  const information = type === 'error' ? <h4>{text}</h4> : <h3>{text}</h3>
  return <div className={className}>{information}</div>
}
